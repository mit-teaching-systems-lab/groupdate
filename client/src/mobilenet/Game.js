import * as tfc from '@tensorflow/tfjs-core';
// import {VIDEO_PIXELS} from './scavenger/camera';


export class Game {
  constructor(net) {
    this.net = net;
  }

  dispose() {
    this.net.dispose();    
  }

  init() {
    return Promise.all([
      this.net.load().then(() => this.warmUpModel()),
      this.camera.setupCamera().then(value => {
        this.camera.setupVideoDimensions(value[0], value[1]);
      }),
    ]);
  }

  /**
   * Ensures the MobileNet prediction model in tensorflow.js is ready to
   * accept data when we need it by triggering a predict call with zeros to
   * preempt the predict tensor setups.
   */
  warmUpModel() {
    this.net.predict(tfc.zeros([VIDEO_PIXELS, VIDEO_PIXELS, 3]));
  }

  /**
   * The game MobileNet predict call used to identify content from the camera
   * and make predictons about what it is seeing.
   */
  async predict() {
    // Run the tensorflow predict logic inside a tfc.tidy call which helps
    // to clean up memory from tensorflow calls once they are done.
    const result = tfc.tidy(() => {

      // For UX reasons we spread the video element to 100% of the screen
      // but our traning data is trained against 244px images. Before we
      // send image data from the camera to the predict engine we slice a
      // 244 pixel area out of the center of the camera screen to ensure
      // better matching against our model.
      const pixels = tfc.fromPixels(this.camera.videoElement);
      const centerHeight = pixels.shape[0] / 2;
      const beginHeight = centerHeight - (VIDEO_PIXELS / 2);
      const centerWidth = pixels.shape[1] / 2;
      const beginWidth = centerWidth - (VIDEO_PIXELS / 2);
      const pixelsCropped =
            pixels.slice([beginHeight, beginWidth, 0],
                         [VIDEO_PIXELS, VIDEO_PIXELS, 3]);

      const predictionResult = this.net.predict(pixelsCropped);
      return {
        predictionResult,
        inputPixels: pixelsCropped.dataSync()
      };
    });

    // This call retrieves the topK matches from our MobileNet for the
    // provided image data.
    const {predictionResult, inputPixels} = result;
    const prediction = await this.net.getTopKClasses(predictionResult, 10);
    return {...prediction, pixels: inputPixels};
  }
}


/**
 * Checks if the current platform is iOS.
 *
 * @returns true if the platform is iOS, false otherwise.
 */
function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}



const GAME_STRINGS = {
  CAMERA_NO_ACCESS: 'Hey! To play you’ll need to enable camera access in ' +
      'your browser address bar or in the Settings app 👆. We won’t store any ' +
      'images from your camera. 👍',
  SAFARI_WEBVIEW: '🚨 To play this game, please open it directly in Safari. ' +
      'If needed, copy/paste or type the URL into the address bar. 🚨',
  CAMERA_GENERAL_ERROR: 'It looks like your browser or device doesn’t ' +
      'support this experiment. It’s designed to work best ' +
      'on mobile (iOS/Safari or Android/Chrome). 😭'
};


export function interpretInitializationError(error) {
  // iOS does not provide access to mediaDevices.getUserMedia via
  // UiWebviews in iOS 11.2 - This causes a TypeError to be returned
  // which we handle to display a relevant message to encourage the user
  // to open the game in the standard Safari app.
  if (error.name === 'TypeError' && isIOS()) {
    return {error: error, code: 'SAFARI_WEBVIEW', messageText: GAME_STRINGS.SAFARI_WEBVIEW };
  } else if (error.name === 'NotAllowedError') {
    // Users that explicitly deny camera access get a message that
    // encourages them to enable camera access.
    return {error: error, code: 'CAMERA_NO_ACCESS', messageText: GAME_STRINGS.CAMERA_NO_ACCESS };
  } else {
    // General error message for issues getting camera access via
    // mediaDevices.getUserMedia.
    return {error: error, code: 'CAMERA_GENERAL_ERROR', messageText: GAME_STRINGS.CAMERA_GENERAL_ERROR };
  }
}
import * as tf from '@tensorflow/tfjs';
import * as tfc from '@tensorflow/tfjs-core';

export function captureFromImage(imgEl) {
  return tf.tidy(() => {
    // Reads the image as a Tensor from the <img /> element.
    const rawImage = tfc.fromPixels(imgEl);

    // Crop the image so we're using the center square of the rectangular
    // image.
    const croppedImage = cropImage(rawImage);

    // Expand the outer most dimension so we have a batch size of 1.
    const batchedImage = croppedImage.expandDims(0);

    // Normalize the image between -1 and 1. The image comes in between 0-255,
    // so we divide by 127 and subtract 1.
    return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
  });
}

/**
 * Crops an image tensor so we get a square image with no white space.
 * @param {Tensor4D} imgTensor An input image Tensor to crop.
 */
function cropImage(imgTensor) {
  const size = Math.min(imgTensor.shape[0], imgTensor.shape[1]);
  const centerHeight = imgTensor.shape[0] / 2;
  const beginHeight = centerHeight - (size / 2);
  const centerWidth = imgTensor.shape[1] / 2;
  const beginWidth = centerWidth - (size / 2);
  return imgTensor.slice([beginHeight, beginWidth, 0], [size, size, 3]);
}

// /**
//  * Adjusts the video size so we can make a centered square crop without
//  * including whitespace.
//  * @param {number} width The real width of the video element.
//  * @param {number} height The real height of the video element.
//  */
// function adjustVideoSize(imgEl, width, height) {
//   const aspectRatio = width / height;
//   if (width >= height) {
//     imgEl.width = aspectRatio * imgEl.height;
//   } else if (width < height) {
//     imgEl.height = imgEl.width / aspectRatio;
//   }
// }
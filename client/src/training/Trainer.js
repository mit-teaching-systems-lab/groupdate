import * as tf from '@tensorflow/tfjs';
import * as tfc from '@tensorflow/tfjs-core';
import {captureFromImage} from './capture';


// // import {ControllerDataset} from './controller_dataset';
// import * as ui from './ui';
// import {Webcam} from './webcam';

// // predicting 4 classes for up, down, left, and right.
// const NUM_CLASSES = 4;

// // A webcam class that generates Tensors from the images from the webcam.
// const webcam = new Webcam(document.getElementById('webcam'));

// // The dataset object where we will store activations.
// const controllerDataset = new ControllerDataset(NUM_CLASSES);

// let truncatedMobileNet;
// let model;

export default class Trainer {
  constructor(options = {}) {
    this.numClasses = options.numClasses || 2; // binary
    this.examples = [];
  }

  async init() {
    this.mobileNetEmbeddings = await loadMobileNetEmbeddings();

    // Warmup the model. This isn't necessary, but makes the first prediction
    // faster. Call `dispose` to release the WebGL memory allocated for the return
    // value of `predict`.
    const IMAGE_SIZE = 224;
    this.mobileNetEmbeddings.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3])).dispose();
  }

  /**
   * Adds an example to the controller dataset.
   * @param {img} example image element, raw
   * @param {number} label The label of the example. Should be a number.
   */
  addExample(imgEl, label) {
    tfc.tidy(() => {
      // Grab the x value from the existing net's embeddings
      const imgTensor = captureFromImage(imgEl);
      const x = this.mobileNetEmbeddings.predict(imgTensor);

      // One-hot encode the label.
      const y = tfc.oneHot(tfc.tensor1d([label]).toInt(), this.numClasses);
      this.examples.push({x, y});
    });
  }

  // /**
  //  * Infer through MobileNet, assumes variables have been loaded. This does
  //  * standard ImageNet pre-processing before inferring through the model. This
  //  * method returns named activations as well as softmax logits.
  //  *
  //  * @param input un-preprocessed input Array.
  //  * @return embedding
  //  */
  // predictWithPreprocessing(input) {
  //   const PREPROCESS_DIVISOR = tfc.scalar(255 / 2);
  //   const preprocessedInput = tfc.div(
  //     tfc.sub(input.asType('float32'), PREPROCESS_DIVISOR),
  //     PREPROCESS_DIVISOR
  //   );
  //   const reshapedInput =
  //       preprocessedInput.reshape([1, ...preprocessedInput.shape]);
  //   const dict: TensorMap = {};
  //   dict[INPUT_NODE_NAME] = reshapedInput;
  // }

  /**
   * Sets up and trains the classifier.
   */
  async train() {
    // const truncatedMobileNet = await loadTruncatedMobileNet();

    //   // Warm up the model. This uploads weights to the GPU and compiles the WebGL
    //   // programs so the first time we collect data from the webcam it will be
    //   // quick.
    //   tf.tidy(() => truncatedMobileNet.predict(webcam.capture()));

    //   if (controllerDataset.xs == null) {
    //     throw new Error('Add some examples before training!');
    //   }

    //   // Creates a 2-layer fully connected model. By creating a separate model,
    //   // rather than adding layers to the mobilenet model, we "freeze" the weights
    //   // of the mobilenet model, and only train weights from the new model.
    //   model = tf.sequential({
    //     layers: [
    //       // Flattens the input to a vector so we can use it in a dense layer. While
    //       // technically a layer, this only performs a reshape (and has no training
    //       // parameters).
    //       tf.layers.flatten({
    //         inputShape: truncatedMobileNet.outputs[0].shape.slice(1)
    //       }),
    //       // Layer 1.
    //       tf.layers.dense({
    //         units: ui.getDenseUnits(),
    //         activation: 'relu',
    //         kernelInitializer: 'varianceScaling',
    //         useBias: true
    //       }),
    //       // Layer 2. The number of units of the last layer should correspond
    //       // to the number of classes we want to predict.
    //       tf.layers.dense({
    //         units: NUM_CLASSES,
    //         kernelInitializer: 'varianceScaling',
    //         useBias: false,
    //         activation: 'softmax'
    //       })
    //     ]
    //   });

    //   // Creates the optimizers which drives training of the model.
    //   const optimizer = tf.train.adam(ui.getLearningRate());
    //   // We use categoricalCrossentropy which is the loss function we use for
    //   // categorical classification which measures the error between our predicted
    //   // probability distribution over classes (probability that an input is of each
    //   // class), versus the label (100% probability in the true class)>
    //   model.compile({optimizer: optimizer, loss: 'categoricalCrossentropy'});

    //   // We parameterize batch size as a fraction of the entire dataset because the
    //   // number of examples that are collected depends on how many examples the user
    //   // collects. This allows us to have a flexible batch size.
    //   const batchSize =
    //       Math.floor(controllerDataset.xs.shape[0] * ui.getBatchSizeFraction());
    //   if (!(batchSize > 0)) {
    //     throw new Error(
    //         `Batch size is 0 or NaN. Please choose a non-zero fraction.`);
    //   }

    //   // Train the model! Model.fit() will shuffle xs & ys so we don't have to.
    //   model.fit(controllerDataset.xs, controllerDataset.ys, {
    //     batchSize,
    //     epochs: ui.getEpochs(),
    //     callbacks: {
    //       onBatchEnd: async (batch, logs) => {
    //         ui.trainStatus('Loss: ' + logs.loss.toFixed(5));
    //       }
    //     }
    //   });
  }
}

// function predict() {
//   while (isPredicting) {
//     const predictedClass = tf.tidy(() => {
//       // Capture the frame from the webcam.
//       const img = webcam.capture();

//       // Make a prediction through mobilenet, getting the internal activation of
//       // the mobilenet model, i.e., "embeddings" of the input images.
//       const embeddings = truncatedMobileNet.predict(img);

//       // Make a prediction through our newly-trained model using the embeddings
//       // from mobilenet as input.
//       const predictions = model.predict(embeddings);

//       // Returns the index with the maximum probability. This number corresponds
//       // to the class the model thinks is the most probable given the input.
//       return predictions.as1D().argMax();
//     });

//     const classId = (await predictedClass.data())[0];
//     predictedClass.dispose();

//     ui.predictClass(classId);
//     await tf.nextFrame();
//   }
//   ui.donePredicting();
// }



// Loads mobilenet and returns a model that returns the internal activation
// we'll use as input to our classifier model.
async function loadMobileNetEmbeddings() {
  const mobilenet = await tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');

  // Return a model that outputs an internal activation.
  const layer = mobilenet.getLayer('conv_pw_13_relu');
  return tf.model({inputs: mobilenet.inputs, outputs: layer.output});
}

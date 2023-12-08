export const AUDIO_CONTEXT = (function createLocalAudioContext(window) {
  try {
    return new window.AudioContext();
  } catch (e) {
    console.error(e)
    throw new Error('Web Audio API is not supported in this browser');
  }
}(global));


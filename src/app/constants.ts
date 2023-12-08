export const IS_DEBUG = false;

export const ALPHA_MORSE_MAP = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '.--',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.',
  0: '-----'
} as const;

export const VALID_MORSE_CODE = [189,190];

export const INTERACTION_KEYS = [
  8,  // backspace
  32, // space
  27, // escape
  9,  // tab
  37, // left arrow
  38, // up arrow
  39, // right arrow
  40, // down arrow
  13, // enter
] as const ;

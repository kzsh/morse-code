import {ALPHA_MORSE_MAP} from '@/app/constants';
import {debug} from '@/app/utils';

/**
 * MorseTranslator
 * turn a string of periods, dashes and spaces into morse code sounds
 */ 

export class MorseTranslator {
  constructor() {}
  translateMessage(message) {
    return message.split('').map(function(char) {
      if (char === ' ') {
        return '  ';
      }
      debug(char.toUpperCase(),'=>', ALPHA_MORSE_MAP[char.toUpperCase()]);
      return ALPHA_MORSE_MAP[char.toUpperCase()] + ' ';
    }).join('');
  }
}

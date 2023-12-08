import {ALPHA_MORSE_MAP} from '@/app/constants';
import {debug} from '@/app/utils';

type ValueOf<T> = T[keyof T]; 

type Code = ValueOf<typeof ALPHA_MORSE_MAP>
type KeyCode = keyof typeof ALPHA_MORSE_MAP

export const translateMessage = (message: string) => {
  return (message.toUpperCase().split('') as Array<KeyCode | ' '>).map((char) => {
    if (char === ' ') {
      return '  ';
    } else {
      debug(char.toUpperCase(),'=>', ALPHA_MORSE_MAP[char]);
      return ALPHA_MORSE_MAP[char] + ' ';
    }
  }).join('');
}

import { IS_DEBUG} from './constants';

export const alphanumericTest = function(candidate: number) {
  return (candidate >= 48 && candidate <= 57) ||
    (candidate >= 65 && candidate <= 90);
};

export const debug = (...args: Array<unknown>) => {
  if (IS_DEBUG) {
    console.debug(...args);
  }
}

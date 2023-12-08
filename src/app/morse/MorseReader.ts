/**
 * MorseReader
 * turn a string of periods, dashes and spaces into morse code sounds
 */ 
export class MorseReader {
  constructor(context, message, cadence = 200, frequency = 500) {
    this.context = context;
    this.message = message;
    this.cadence = cadence;
    this.frequency = frequency;
    this.interWordPauseDuration = cadence * 2;
    this.readMessage(message, cadence)
  }


  createOscillator() {
    const oscillator = this.context.createOscillator();
    const gainNode = this.createGainNode();
    oscillator.type = 'sine';
    oscillator.frequency.value = this.frequency;
    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    const context = this.context;
    return {
      start() {
        oscillator.start();
      },
      stop() {
        gainNode.gain.setValueAtTime(gainNode.gain.value, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.007);
        setTimeout(function() {
          oscillator.stop();
        }, 10);
      }
    };
  }

  createGainNode() {
   return this.context.createGain();
  }

  readMessage(message, cadence) {
    const words = message.split(' ');
    let accumulatedLength = 0;
    words.forEach((word) => {
      const wordDuration = word.length * cadence + this.interWordPauseDuration;
      this.readWord(word, cadence, accumulatedLength);
      accumulatedLength += wordDuration;
    });

  }

  readWord(word, cadence, durationOffset) {
    let nextChar = 0;
    setTimeout(() => {
      const interval = setInterval(() => {
        this.readCharacter(word[nextChar++]);

        if (nextChar === word.length) {
          clearInterval(interval);
        }
      }, cadence);
    }, durationOffset);
  }

  readCharacter(char) {
    switch(char) {
      case '.': {
        this.playDot();
        break;
      }
      case '-': {
        this.playDash();
        break;
      }
      default: {
        // no-op
        break;
      }
    }
  }

  playDot() {
   this.playSound(this.cadence / 3);
  }

  playDash() {
   this.playSound(this.cadence * 8/10);
  }

  playSound(duration) {
    const oscillator = this.createOscillator();
    oscillator.start();

    setTimeout(function() {
      oscillator.stop();
    }, duration);
  }
}

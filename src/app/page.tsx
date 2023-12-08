'use client'
import {useCallback, useEffect, useState, useRef} from 'react';

import {Field} from '@/components';
import {alphanumericTest} from './utils';
import {MorseReader, translateMessage} from './morse';
import {INTERACTION_KEYS, VALID_MORSE_CODE} from './constants';

import styles from './page.module.css'

const AUDIO_CONTEXT = (function createLocalAudioContext(window) {
  try {
    return new window.AudioContext();
  } catch (e) {
    console.error(e)
    throw new Error('Web Audio API is not supported in this browser');
  }
}(window));

export default function Home() {
  const messageRef = useRef<HTMLInputElement>(null)
  const encodedMessageRef = useRef<HTMLInputElement>(null)

  const [cadence, setCadence] = useState('80');
  const [message, setMessage] = useState('');
  const [encodedMessage, setEncodedMessage] = useState('');

  useEffect(() => {
    const messageElement= messageRef?.current;
    const encodedMessageElement = encodedMessageRef?.current;
    if(messageElement && encodedMessageElement) {
      messageElement.addEventListener('keydown',(e) => {
        // Test for the key codes you want to filter out.
        const isValidKey = alphanumericTest(e.keyCode) || INTERACTION_KEYS.some(c => e.keyCode === c);
        if (!isValidKey) {
          e.preventDefault();
        } 
      });

      messageElement.addEventListener('keyup',() => {
        setEncodedMessage(translateMessage(messageElement.value));
      });

    }
  }, [messageRef, encodedMessageRef])

  useEffect(() => {
    const current = encodedMessageRef?.current;
    if(current) {
      current.addEventListener('keydown', (e) => {
        // Test for the key codes you want to filter out.
        const codes = [...INTERACTION_KEYS,...VALID_MORSE_CODE];
        const isValidKey = codes.some(c => e.keyCode === c);
        if (!isValidKey) {
          e.preventDefault();
        }
      })
    }
  }, [encodedMessageRef])

  const run = useCallback(() => {
    const frequency = 500;

    if(encodedMessage.length && +cadence > 0) {
      new MorseReader(AUDIO_CONTEXT, encodedMessage, +cadence, frequency);
    }
  }, [cadence, encodedMessage])

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={(e) => {
        e.preventDefault();
        run();
      }}>
        <Field 
          autoFocus
          _ref={messageRef}
          label="Message" 
          value={message}
          description="Type a message here to encode it into morse code."
          setValue={setMessage}
        />
        <Field 
          label="Encoded Message"
          _ref={encodedMessageRef}
          description="Morse-encoded message. Spaces indicate pauses between characters and words." 
          value={encodedMessage}
          setValue={setEncodedMessage}
        />
        <Field
          type="number"
          label="Cadence"
          description="playback rate in ms (lower is faster)"
          value={cadence}
          setValue={setCadence}
        />
        <button className={styles.button} type="submit">
          <p>Play</p> 
          <p className={styles.button__hint}>(or hit enter)</p>
        </button>
      </form>
    </main>
  )
}

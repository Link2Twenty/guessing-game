import { useEffect } from 'preact/hooks';

// Styles
import styles from './Keyboard.module.scss';

// Types
export interface KeyboardProps {
  vowelMode: boolean;
  usedChar: Set<string>;
  onClick: (char: string) => void;
}

// Constants
const isVowel = (key: string) => /^[AEIOU]$/i.test(key);

const isValidKeyPress = (key: string, vowelMode: boolean) => {
  return /^[A-Z]$/i.test(key) ? isVowel(key) === vowelMode : false;
};

const KEYBOARD_LAYOUT = ['QWERTYUIOP'.split(''), 'ASDFGHJKL'.split(''), 'ZXCVBNM'.split('')];

export default function Keyboard({ vowelMode, usedChar, onClick = () => {} }: KeyboardProps) {
  // Listen for keyboard presses too
  useEffect(() => {
    const onKeyPress = ({ key }: KeyboardEvent) => isValidKeyPress(key, vowelMode) && onClick(key.toUpperCase());

    window.addEventListener('keypress', onKeyPress);

    return () => window.removeEventListener('keypress', onKeyPress);
  }, [vowelMode, onClick]);

  return (
    <div className={styles['keyboard']}>
      {KEYBOARD_LAYOUT.map((row) => (
        <div key={row} className={styles['keyboard__row']}>
          {row.map((k) => (
            <button
              key={k[0]}
              onClick={() => onClick(k)}
              disabled={isVowel(k) !== vowelMode || usedChar.has(k)}
              className={styles['keyboard__key']}
            >
              {k}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

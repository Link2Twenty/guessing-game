import { useEffect } from 'preact/hooks';

// Styles
import useClassList, { mapClassesCurried } from '@blocdigital/useclasslist';
import maps from './Keyboard.module.scss';

const mc = mapClassesCurried(maps, true) as (cn: string) => string;

// Types
export interface KeyboardProps {
  vowelMode: boolean;
  usedChar: Set<string>;
  onClick: (char: string) => void;
  className?: HTMLElement['className'];
}

// Constants
const isVowel = (key: string) => /^[AEIOU]$/i.test(key);

const isValidKeyPress = (key: string, vowelMode: boolean) => {
  return /^[A-Z]$/i.test(key) ? isVowel(key) === vowelMode : false;
};

const KEYBOARD_LAYOUT = ['QWERTYUIOP'.split(''), 'ASDFGHJKL'.split(''), 'ZXCVBNM'.split('')];

export default function Keyboard({ vowelMode, usedChar, onClick = () => {}, className }: KeyboardProps) {
  const classlist = useClassList({ defaultClass: 'keyboard', className, maps, string: true }) as string;

  // Listen for keyboard presses too
  useEffect(() => {
    const onKeyPress = ({ key }: KeyboardEvent) => isValidKeyPress(key, vowelMode) && onClick(key.toUpperCase());

    window.addEventListener('keypress', onKeyPress);

    return () => window.removeEventListener('keypress', onKeyPress);
  }, [vowelMode, onClick]);

  return (
    <div className={classlist}>
      {KEYBOARD_LAYOUT.map((row) => (
        <div key={row} className={mc('keyboard__row')}>
          {row.map((k) => (
            <button
              key={k[0]}
              onClick={() => onClick(k)}
              disabled={isVowel(k) !== vowelMode || usedChar.has(k)}
              className={mc('keyboard__key')}
            >
              {k}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

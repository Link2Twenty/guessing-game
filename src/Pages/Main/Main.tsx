import { useCallback, useContext, useState } from 'preact/compat';

// Components
import LetterGrid from '../../components/LetterGrid';
import Keyboard from '../../components/Keyboard';
import Button from '../../components/Button';

// Context
import { CategorySelectContext } from '../../hooks/useCategorySelect';

// Styles
import { mapClassesCurried } from '@blocdigital/useclasslist';
import maps from './Main.module.scss';

const mc = mapClassesCurried(maps, true) as (cn: string) => string;

// Types
export interface MainProps {
  onChange: () => void;
}

const allLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Main({ onChange }: MainProps) {
  const { phrase } = useContext(CategorySelectContext) || {};

  const [vowelMode, setVowelMode] = useState(false);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());

  const handleKeyPress = useCallback((char: string) => setGuessed((l) => new Set(l.add(char))), []);

  if (!phrase) return null;

  return (
    <main className={mc('main')}>
      <section className={mc('main__controls')}>
        <Button onClick={() => setGuessed(new Set())}>Reset</Button>
        <Button
          onClick={() => {
            setGuessed(new Set());
            onChange();
          }}
        >
          Change Puzzle
        </Button>
        <Button onClick={() => setGuessed(new Set(allLetter))}>Solve</Button>
        <Button aria-pressed={vowelMode} onClick={() => setVowelMode((b) => !b)}>
          Toggle Vowel
        </Button>
      </section>
      <section className={mc('main__gameboard')}>
        <LetterGrid rows={phrase} guesses={guessed} />
      </section>
      <section className={mc('main__keyboard')}>
        <Keyboard vowelMode={vowelMode} usedChar={guessed} onClick={handleKeyPress} />
      </section>
    </main>
  );
}

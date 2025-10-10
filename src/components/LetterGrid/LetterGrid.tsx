// Components
import LetterBox from '../LetterBox';

// Styles
import styles from './LetterGrid.module.scss';

// Types
export interface LetterGridProps {
  guesses: Set<string>;
  rows: [string, string, string, string];
}

export default function LetterGrid({ guesses, rows }: LetterGridProps) {
  return (
    <div className={styles['letter-grid']}>
      {rows.map((row, y) =>
        row
          .split('')
          .map((char, x) =>
            char === ' ' ? (
              <LetterBox active={false} key={`${x}:${y}:${char}:${row}`} />
            ) : (
              <LetterBox
                active={guesses.has(char) || new RegExp(/\p{P}/u).test(char)}
                char={char}
                key={`${x}:${y}:${char}:${row}`}
              />
            )
          )
      )}
    </div>
  );
}

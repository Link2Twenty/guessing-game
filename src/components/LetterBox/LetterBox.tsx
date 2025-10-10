// Styles
import styles from './LetterBox.module.scss';

// Types
export interface LetterBoxProps {
  char?: string;
  active: boolean;
  className?: HTMLElement['className'];
}

export default function LetterBox({ char, active }: LetterBoxProps) {
  return (
    <div className={styles['letter-box']} aria-hidden={!active}>
      <div className={styles['letter-box__container']}>
        {char && <div className={styles['letter-box__character']}>{char}</div>}
        <div className={styles['letter-box__blank']} />
      </div>
    </div>
  );
}

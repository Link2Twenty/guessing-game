import { createContext } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { formatString, randomItem } from "../../Helpers/helpers";

export interface CategorySelectProps {
  phrase: [string, string, string, string];
  title: string;
  category: string | number | null;
  changePhrase: () => void;
  changeCategory: (category: string | number, title: string) => void;
}

export default function useCategorySelect(): CategorySelectProps {
  const [category, setCategory] = useState<CategorySelectProps["category"]>(null);
  const [title, setTitle] = useState<CategorySelectProps["title"]>("Unknown");

  const [phrases, setPhrases] = useState<string[]>([]);
  const [phrase, setPhrase] = useState<CategorySelectProps["phrase"]>(formatString(""));

  // get the list of phrase
  useEffect(() => {
    if (category === null) return;

    const ac = new AbortController();

    fetch(`./api/${category}.json`)
      .then((res) => res.json())
      .then((json) => {
        setPhrases(json);
        setPhrase(formatString(randomItem<string>(json).toUpperCase()));
      })
      .catch((err) => console.warn(err));

    return ac.abort();
  }, [category]);

  const changePhrase = useCallback<CategorySelectProps["changePhrase"]>(() => {
    if (phrases.length <= 0) return setPhrase(formatString(""));

    setPhrase(formatString(randomItem(phrases).toUpperCase()));
  }, [phrases]);

  const changeCategory = useCallback<CategorySelectProps["changeCategory"]>(
    (category, title) => {
      setTitle(title);
      setCategory((c) => {
        if (c === category) changePhrase();

        return category;
      });
    },
    [changePhrase]
  );

  return {
    phrase,
    category,
    title,
    changePhrase,
    changeCategory,
  };
}

export const CategorySelectContext = createContext<CategorySelectProps | null>(null);

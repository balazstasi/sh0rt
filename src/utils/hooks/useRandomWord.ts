import { useCallback, useEffect, useState } from "react";
import createContainer from "constate";
import { RANDOM_WORD_API } from "../../constants/strings";

/**
 * Hook for fetching random English words and concatenating them into the ID of the shortened URL -> To be memorizable
 * Better would be to enable the user editing the ID of the shortened URL but I didn't want to get out of scope too much
 */
export const useRandomWord = ({ limit }: { limit: number } = { limit: 100 }) => {
  const [randomWords, setRandomWords] = useState<string[]>();

  const fetchRandomWords = useCallback(async (limit: number) => {
    const response = await fetch(`${RANDOM_WORD_API}${limit}`);
    const randomWords = await response.json();

    return randomWords;
  }, []);

  useEffect(() => {
    fetchRandomWords(limit).then((randomWords: string[]) => {
      setRandomWords(randomWords);
    });
  }, [fetchRandomWords, limit]);

  const getRandomWord = useCallback(() => {
    if (!randomWords) return Math.random().toString(36).substring(2, 7);
    return randomWords?.[Math.floor(Math.random() * randomWords?.length)];
  }, [randomWords]);

  return {
    randomWord: getRandomWord,
    fullList: randomWords,
  };
};

export const [RandomWordProvider, useRandomWordContext] = createContainer(useRandomWord);

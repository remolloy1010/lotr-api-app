import { useEffect, useState } from "react";
import { fetchAPIData, QUOTES_ENDPOINT } from "./apiUtils";

// custom hook = function that calls other hooks
export const useFetchQuote = () => {
  const [quote, setQuote] = useState<string | undefined>();
  const [character, setCharacter] = useState<string | undefined>();
  const [characterRace, setCharacterRace] = useState<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const quotes = await fetchAPIData(QUOTES_ENDPOINT);

      const quote = quotes.docs[Math.floor(Math.random() * quotes.docs.length)]; //get some random index from the quotes array
      setQuote(quote.dialog);

      const characters = await fetchAPIData(
        "https://the-one-api.dev/v2/character?_id=" + quote.character
      ); //add character id from quote to the query string to hit api endpoint
      const character = characters.docs[0]; // 1st docs in array - only 1 character per quote

      setCharacter(character.name); // set character output to the name
      setCharacterRace(character.race);
    };
    fetchData();
  }, []);

  return { quote, character, characterRace };
};

import { useEffect, useState } from "react";
import "./App.css";
import { useFetchQuote } from "./useFetchQuote";
import {
  CHAPTERS_ENDPOINT,
  CHARACTERS_ENDPOINT,
  fetchAPIData,
  MOVIES_ENDPOINT,
  QUOTES_ENDPOINT,
} from "./apiUtils";
import { getRaceCount } from "./dataUtils";
import RacesBarChart from "./RacesBarChart";

export default function App() {
  const [raceArray, setRaceArray] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [characters, setCharacters] = useState();

  const { quote, character, characterRace } = useFetchQuote();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterList = await fetchAPIData(CHARACTERS_ENDPOINT);
        setRaceArray(getRaceCount(characterList));
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characters = await fetchAPIData(QUOTES_ENDPOINT);
        setCharacters(characters);
        console.log(characters);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div> ERROR: Can't find character list! </div>;
  }
  if (loading) {
    return <div> Loading....</div>;
  }

  return (
    <div>
      <blockquote>{quote}</blockquote>
      <cite>
        - {character} ({characterRace})
      </cite>
      <RacesBarChart data={raceArray}> </RacesBarChart>
    </div>
  );
}

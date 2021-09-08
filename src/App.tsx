import { PureComponent, useEffect, useState } from "react";
import "./App.css";
import { useFetchQuote } from "./useFetchQuote";
import {
  CHAPTERS_ENDPOINT,
  CHARACTERS_ENDPOINT,
  fetchAPIData,
  MOVIES_ENDPOINT,
  QUOTES_ENDPOINT,
} from "./apiUtils";
import { genderAnalytics, getRaceCount } from "./dataUtils";
import RacesBarChart from "./RacesBarChart";
import GenderChart from "./GenderChart";

export default function App() {
  const [raceArray, setRaceArray] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [characters, setCharacters] = useState();
  const [genderArray, setGenderArray] = useState();

  const { quote, character, characterRace } = useFetchQuote();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterList = await fetchAPIData(CHARACTERS_ENDPOINT);
        console.log(genderAnalytics(characterList));
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
      const characterList = await fetchAPIData(CHARACTERS_ENDPOINT);
      setGenderArray(genderAnalytics(characterList));
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
      <h1>
        {" "}
        <title> The One Ring to Rule Them All!</title>{" "}
      </h1>
      <blockquote>{quote}</blockquote>
      <cite>
        - {character} ({characterRace})
      </cite>
      <div>
        <GenderChart data={genderArray}></GenderChart>

        <RacesBarChart data={raceArray}> </RacesBarChart>
      </div>
    </div>
  );
}

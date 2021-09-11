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
import { genderAnalytics, getRaceCount, movieAnalytics } from "./dataUtils";
import RacesBarChart from "./RacesBarChart";
import GenderChart from "./GenderChart";
import ExamplePie from "./charts/MovieRatingPieChart";

export default function App() {
  const [raceArray, setRaceArray] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState();
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
        const movies = await fetchAPIData(MOVIES_ENDPOINT);
        setMovies(movies);
        console.log("----------");
        console.log(movies.docs[0]);
        // console.log(movieAnalytics(movies));
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
        <h2>Gender Distribution</h2>
        <h4>
          <em>
            What's the gender distribution among the characters in the books?
          </em>
        </h4>
        <GenderChart data={genderArray}></GenderChart>
        <ExamplePie data={movies}></ExamplePie>
        <h2>Race</h2>
        <h4>
          <em>How many characters in the books are a part of each race?</em>
        </h4>
        <RacesBarChart data={raceArray}> </RacesBarChart>
      </div>
    </div>
  );
}

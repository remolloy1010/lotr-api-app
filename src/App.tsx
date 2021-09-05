import { useEffect, useState } from "react";
import "./App.css";
// import styles from "./index.css";
import { useFetchQuote } from "./useFetchQuote";
import { CHARACTERS_ENDPOINT, fetchAPIData } from "./apiUtils";
import { getRaceCount } from "./dataUtils";
import RacesBarChart from "./RacesBarChart";

export default function App() {
  const [raceArray, setRaceArray] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

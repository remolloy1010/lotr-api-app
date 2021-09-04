import { useEffect, useState } from "react";
import "./App.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFetchQuote } from "./useFetchQuote";
import { CHARACTERS_ENDPOINT, fetchAPIData } from "./apiUtils";

export default function App() {
  const [raceArray, setRaceArray] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { quote, character, characterRace } = useFetchQuote();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterList = await fetchAPIData(CHARACTERS_ENDPOINT);
        // Add try-catch error handling if data isn't fetched

        // convert to map - iterates over array and for each value, return the race field
        const characterRaceArray: Array<string> = characterList.docs.map(
          (doc: any) => doc.race
        );

        /////////// DATA ///////////////
        let result_object: any = {};

        for (let i = 0; i < characterRaceArray.length; i++) {
          if (!result_object[characterRaceArray[i]])
            result_object[characterRaceArray[i]] = 0;
          ++result_object[characterRaceArray[i]];
        }

        const arr2: any = [];
        for (const [key, value] of Object.entries(result_object)) {
          let obj_race_count = {
            race: "",
            count: 0,
          };
          obj_race_count.race = `${key}`;
          obj_race_count.count = parseInt(`${value}`);
          arr2.push(obj_race_count);
        }
        arr2.sort((a: any, b: any) => (a.count > b.count ? -1 : 1));

        setRaceArray(arr2);
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
      <ResponsiveContainer width={1000} height={800}>
        <BarChart data={raceArray} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="count" type="number" />
          <YAxis
            dataKey="race"
            type="category"
            width={120}
            height={6}
            interval={0}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

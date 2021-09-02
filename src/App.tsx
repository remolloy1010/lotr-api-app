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

export default function App() {
  const [quote, setQuote] = useState();
  const [character, setCharacter] = useState();
  const [characterRace, setCharacterRace] = useState();
  const [raceArray, setRaceArray] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //// move API calls and other info to utils file
  //// create multiple useeffects
  //// create function for bar chart

  const example_data = {
    Elf: 50,
    Human: 12,
    Hobbit: 15,
  };

  const example_array: any = [];
  for (const [key, value] of Object.entries(example_data)) {
    let obj_race_count = {
      race: "",
      count: "",
    };
    obj_race_count.race = `${key}`;
    obj_race_count.count = `${value}`;
    example_array.push(obj_race_count);
  }

  useEffect(() => {
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer qBI4FgTSBWAeIJ08u9nW",
    };
    const fetchData = async () => {
      //First fetch quote data from API
      const rawQuotes = await fetch("https://the-one-api.dev/v2/quote", {
        headers: headers,
      });
      //(a)wait for quote to be fetched and promise resolved (success) before storing return value in state component
      const quotes = await rawQuotes.json(); //get in json format
      const quote = quotes.docs[Math.floor(Math.random() * quotes.docs.length)]; //get some random index from the quotes array
      setQuote(quote.dialog); //get the dialog (could also grab the character who said it and the movie)

      try {
        const rawCharacterList = await fetch(
          "https://the-one-api.dev/v2/character",
          { headers: headers }
        );

        const characterList = await rawCharacterList.json();
        console.log(characterList == null);

        // Add try-catch error handling if data isn't fetched

        // convert to map - iterates over array and for each value, return the race field
        const characterRaceArray: Array<string> = characterList.docs.map(
          (doc: any) => doc.race
        );

        // for (let i = 0; i < characterList.docs.length; i++) {
        //   characterRaceArray.push(characterList.docs[i].race);
        // }
        // console.log(characterRaceArray);

        /////////// DATA ///////////////
        let result_object: any = {};

        for (let i = 0; i < characterRaceArray.length; i++) {
          if (!result_object[characterRaceArray[i]])
            result_object[characterRaceArray[i]] = 0;
          ++result_object[characterRaceArray[i]];
        }
        // console.log(result_object);

        const arr2: any = [];
        for (const [key, value] of Object.entries(result_object)) {
          let obj_race_count = {
            race: "",
            count: 0,
          };
          obj_race_count.race = `${key}`;
          obj_race_count.count = parseInt(`${value}`);
          arr2.push(obj_race_count);
          // console.log(obj_race_count);
        }
        console.log(arr2);
        arr2.sort((a: any, b: any) => (a.count > b.count ? -1 : 1));

        setRaceArray(arr2);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }

      const rawCharacters = await fetch(
        "https://the-one-api.dev/v2/character?_id=" + quote.character,
        { headers: headers }
      ); //add character id from quote to the query string to hit api endpoint
      const characters = await rawCharacters.json();
      console.log(characters);
      const character = characters.docs[0]; // 1st docs in array - only 1 character per quote

      // console.log(character.race);

      setCharacter(character.name); // set character output to the name
      setCharacterRace(character.race);

      const rawMovies = await fetch(
        "https://the-one-api.dev/v2/movie?_id=" + quote.movie,
        { headers: headers }
      );
      const movies = await rawMovies.json();
      // console.log(movies);
      const movie = movies.docs[0];
      // console.log(movie);

      const rawChapters = await fetch(
        "https://the-one-api.dev/v2/chapter?_id=",
        {
          headers: headers,
        }
      );
      const chapters = await rawChapters.json();
      // console.log(chapters);
      const chapter = chapters.docs[1];
      // console.log(chapter);

      const rawBooks = await fetch(
        "https://the-one-api.dev/v2/book?_id=5cf5805fb53e011a64671582" +
          chapter.chapterName,
        {
          headers: headers,
        }
      );
      const books = await rawBooks.json();
      // console.log(books);
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
      <ResponsiveContainer width="100%" height={800}>
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

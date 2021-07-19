import { useEffect, useState } from "react";
import "./App.css";
import { getRaces } from "./getRaces";

function App() {
  const [quote, setQuote] = useState();
  const [character, setCharacter] = useState();
  const [characterRace, setCharacterRace] = useState();
  const [movie, setMovie] = useState();

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

      const rawCharacterList = await fetch(
        "https://the-one-api.dev/v2/character",
        { headers: headers }
      );
      const characterList = await rawCharacterList.json();
      const characterRaceArray = [];
      // console.log(characterList.docs);
      for (let i = 0; i < characterList.docs.length; i++) {
        // console.log(characterList.docs[i].race);
        characterRaceArray.push(characterList.docs[i].race);
      }
      console.log(characterRaceArray);
      let distinctRaces = characterRaceArray.filter(
        (item, i, ar) => ar.indexOf(item) === i
      );

      const arr = [2, 2, 5, 2, 2, 2, 4, 5, 5, 9];
      let result_object: any = {};

      for (let i = 0; i < characterRaceArray.length; i++) {
        if (!result_object[characterRaceArray[i]])
          result_object[characterRaceArray[i]] = 0;
        ++result_object[characterRaceArray[i]];
      }
      console.log(result_object);

      const rawCharacters = await fetch(
        "https://the-one-api.dev/v2/character?_id=" + quote.character,
        { headers: headers }
      ); //add character id from quote to the query string to hit api endpoint
      const characters = await rawCharacters.json();
      console.log(characters);
      const character = characters.docs[0]; // 1st docs in array - only 1 character per quote

      console.log(character.race);

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

  return (
    <div>
      <blockquote>{quote}</blockquote>
      <cite>
        - {character} ({characterRace})
      </cite>
    </div>
  );
}

export default App;

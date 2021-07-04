import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState();
  const [character, setCharacter] = useState();

  useEffect(() => {
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer qBI4FgTSBWAeIJ08u9nW",
    };
    const fetchData = async () => {
      const rawQuotes = await fetch("https://the-one-api.dev/v2/quote", {
        headers: headers,
      });
      const quotes = await rawQuotes.json();
      const quote = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
      setQuote(quote.dialog);
      const rawCharacters = await fetch(
        "https://the-one-api.dev/v2/character?_id=" + quote.character,
        { headers: headers }
      );
      const characters = await rawCharacters.json();
      const character = characters.docs[0];
      setCharacter(character.name);
    };

    fetchData();
  }, []);

  return (
    <div>
      <blockquote>{quote}</blockquote>
      <cite>- {character}</cite>
    </div>
  );
}

export default App;

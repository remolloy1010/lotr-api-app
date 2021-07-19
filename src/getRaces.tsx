import { useEffect } from "react";

export const getRaces = ({}: any) => {
  useEffect(() => {
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer qBI4FgTSBWAeIJ08u9nW",
    };
    const fetchData = async () => {
      const rawCharacterList = await fetch(
        "https://the-one-api.dev/v2/character",
        { headers: headers }
      );
      const characterList = await rawCharacterList.json();
      const characterRaceArray = [];
      console.log(characterList.docs);
      for (let i = 0; i < characterList.docs.length; i++) {
        // console.log(characterList.docs[i].race);
        characterRaceArray.push(characterList.docs[i].race);
        console.log(characterRaceArray);
      }
    };
    fetchData();
  }, []);
};

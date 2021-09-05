export const getRaceCount = (charList: any) => {
  const characterRaceArray: Array<string> = charList.docs.map(
    (doc: any) => doc.race
  );

  /////////// DATA ///////////////
  let result_object: any = {};

  for (let i = 0; i < characterRaceArray.length; i++) {
    if (!result_object[characterRaceArray[i]])
      result_object[characterRaceArray[i]] = 0;
    ++result_object[characterRaceArray[i]];
  }

  const raceCountArray: any = [];
  for (const [key, value] of Object.entries(result_object)) {
    let obj_race_count = {
      race: "",
      count: 0,
    };
    obj_race_count.race = `${key}`;
    obj_race_count.count = parseInt(`${value}`);
    raceCountArray.push(obj_race_count);
  }
  return raceCountArray.sort((a: any, b: any) => (a.count > b.count ? -1 : 1));
};

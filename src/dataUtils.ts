export const getRaceCount = (charList: any) => {
  const characterRaceArray0: Array<string> = charList.docs.map(
    (doc: any) => doc.race
  );

  const characterRaceArray: Array<string> = cleanRaceData(characterRaceArray0);

  const filteredRaceArray: Array<string> = characterRaceArray.filter(function (
    race: string | undefined
  ) {
    return race !== "NaN";
  });

  /////////// DATA ///////////////
  let result_object: any = {};

  for (let i = 0; i < filteredRaceArray.length; i++) {
    if (filteredRaceArray[i] === "NaN" || filteredRaceArray[i] === "") i++;
    else if (!result_object[filteredRaceArray[i]])
      result_object[filteredRaceArray[i]] = 0;
    ++result_object[filteredRaceArray[i]];
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

export const cleanRaceData = (charList: any) => {
  let cleanedRaceArray: Array<string> = [];

  let regex_orc = /Orc/;
  let regex_eagle = /Eagle/;
  let regex_elf = /(Elf|Elve)/i;
  let regex_dwarf = /(Dwarf|Dwarves)/;
  let regex_ent = /Ent/;
  let regex_hobbit = /Hobbit/;
  let regex_balrog = /(balrog|Balrog)/;
  let regex_human = /(Human|Men)/;
  let regex_uruk = /Uruk/;
  let regex_dragon = /(Dragon|Urul)/;

  for (let i = 0; i < charList.length; i++) {
    if (regex_orc.test(charList[i])) {
      cleanedRaceArray[i] = "Orc";
    } else if (regex_eagle.test(charList[i])) {
      cleanedRaceArray[i] = "Eagle";
    } else if (regex_elf.test(charList[i])) {
      cleanedRaceArray[i] = "Elf";
    } else if (regex_ent.test(charList[i])) {
      cleanedRaceArray[i] = "Ent";
    } else if (regex_hobbit.test(charList[i])) {
      cleanedRaceArray[i] = "Hobbit";
    } else if (regex_dwarf.test(charList[i])) {
      cleanedRaceArray[i] = "Dwarf";
    } else if (regex_balrog.test(charList[i])) {
      cleanedRaceArray[i] = "Balrog";
    } else if (regex_human.test(charList[i])) {
      cleanedRaceArray[i] = "Human";
    } else if (regex_uruk.test(charList[i])) {
      cleanedRaceArray[i] = "Uruk";
    } else if (regex_dragon.test(charList[i])) {
      cleanedRaceArray[i] = "Dragon";
    } else {
      cleanedRaceArray[i] = charList[i];
    }
  }
  return cleanedRaceArray;
};

export const cleanGenderData = (charList: any) => {
  let cleanedGenderArray: Array<string> = [];

  let regex_female = /female/;
  let regex_male = /male/;

  for (let i = 0; i < charList.length; i++) {
    if (typeof charList[i] !== "undefined") {
      if (regex_female.test(charList[i].toLowerCase())) {
        cleanedGenderArray[i] = "Female";
      } else if (regex_male.test(charList[i].toLowerCase())) {
        cleanedGenderArray[i] = "Male";
      } else {
        cleanedGenderArray[i] = charList[i];
      }
    }
  }

  return cleanedGenderArray;
};

export const genderAnalytics = (charList: any) => {
  const characterGenderArray0: Array<string> = charList.docs.map(
    (doc: any) => doc.gender
  );
  const characterGenderArray: Array<string> = cleanGenderData(
    characterGenderArray0
  );
  const filteredGenderArray: Array<string> = characterGenderArray.filter(
    function (gender: string | undefined) {
      return gender !== "NaN";
    }
  );

  console.log("////////////////");
  console.log(characterGenderArray);
  /////////// DATA ///////////////
  let result_object: any = {};

  for (let i = 0; i < filteredGenderArray.length; i++) {
    if (filteredGenderArray[i] === "NaN" || filteredGenderArray[i] === "") i++;
    else if (!result_object[filteredGenderArray[i]])
      result_object[filteredGenderArray[i]] = 0;
    ++result_object[filteredGenderArray[i]];
  }

  const genderCountArray: any = [];
  for (const [key, value] of Object.entries(result_object)) {
    let obj_gender_count = {
      gender: "",
      count: 0,
    };
    obj_gender_count.gender = `${key}`;
    obj_gender_count.count = parseInt(`${value}`);
    genderCountArray.push(obj_gender_count);
  }

  return genderCountArray;
};

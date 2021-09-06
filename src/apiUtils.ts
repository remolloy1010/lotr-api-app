const headers = {
  Accept: "application/json",
  Authorization: "Bearer qBI4FgTSBWAeIJ08u9nW",
};

export const QUOTES_ENDPOINT = "https://the-one-api.dev/v2/quote";
export const CHARACTERS_ENDPOINT = "https://the-one-api.dev/v2/character";
export const MOVIES_ENDPOINT = "https://the-one-api.dev/v2/movie";
export const CHAPTERS_ENDPOINT = "https://the-one-api.dev/v2/chapter";

export const fetchAPIData = async (url: string) => {
  //First fetch raw data from API
  const rawAPIdata = await fetch(url, {
    headers: headers,
  });
  return await rawAPIdata.json(); //get in json format
};

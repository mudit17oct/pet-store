import pf from "petfinder-client";
if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("No API keys");
}
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

export default function getBreeds() {
  return function getBreedsThunk(
    dispatch: any,
    getState: () => { animal: string }
  ) {
    const { animal } = getState();
    petfinder.breed.list({ animal }).then(data => {
      let breeds: string[] = [];
      if (
        data.petfinder &&
        data.petfinder.breeds &&
        Array.isArray(data.petfinder.breeds.breed)
      ) {
        breeds = data.petfinder.breeds.breed;
      }
      dispatch({ type: "CHANGE_BREEDS", payload: breeds });
    });
  };
}

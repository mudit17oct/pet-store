/* tslint:disable no-empty */
import React from "react";

const SearchContext = React.createContext({
  location: "Seattle, WA",
  animal: "",
  breed: "",
  breeds: [] as string[],
  updateStateArrow(event: React.KeyboardEvent<HTMLInputElement>) {},
  updateStateBind(event: React.ChangeEvent<HTMLInputElement>) {},
  handleBreedChange(event: React.KeyboardEvent<HTMLInputElement>) {},
  getBreeds() {}
});

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;

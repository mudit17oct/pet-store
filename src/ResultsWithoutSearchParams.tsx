import React from "react";
import Pet from "./Pet";
import pf, { Pet as PetType } from "petfinder-client";
import SearchParams from "./SearchParams";
import { Consumer } from "./SearchContext";
import { RouteComponentProps } from "@reach/router";
if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("No API keys");
}
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
interface Props {
  searchParams?: {
    location: string;
    animal: string;
    breed: string;
  };
}
interface PetState {
  pets: PetType[];
}
class ResultsWithoutSearchParams extends React.Component<
  Props & RouteComponentProps,
  PetState
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pets: []
    };
  }
  public componentDidMount() {
    this.search();
  }
  public search = () => {
    // const promise = petfinder.breed.list({ animal: "dog" });
    // promise.then(console.log, console.error);
    petfinder.pet
      .find({
        output: "full",
        location: this.props.searchParams
          ? this.props.searchParams.location
          : "",
        animal: this.props.searchParams ? this.props.searchParams.animal : "",
        breed: this.props.searchParams ? this.props.searchParams.breed : ""
      })
      .then(data => {
        let pets: PetType[];
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }
        this.setState({
          pets
        });
      });
  };
  public render() {
    return (
      <div>
        {this.state.pets.map((pet, index) => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              key={index}
              name={pet.name}
              animal={pet.animal}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city},${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}
export default function ResultsWithoutSearchParamsWithContext(
  props: Props & RouteComponentProps
) {
  return (
    <Consumer>
      {context => (
        <ResultsWithoutSearchParams {...props} searchParams={context} />
      )}
    </Consumer>
  );
}

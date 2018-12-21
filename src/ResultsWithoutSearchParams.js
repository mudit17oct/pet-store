import React from "react";
import Pet from "./Pet";
import pf from "petfinder-client";
import SearchParams from "./SearchParams";
import { Consumer } from "./SearchContext";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
class ResultsWithoutSearchParams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }
  componentDidMount() {
    this.search();
  }
  search = () => {
    // const promise = petfinder.breed.list({ animal: "dog" });
    // promise.then(console.log, console.error);
    petfinder.pet
      .find({
        output: "full",
        location: this.props.searchParams.location,
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
      .then(data => {
        let pets;
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
          pets: pets
        });
      });
  };
  render() {
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
export default function ResultsWithoutSearchParamsWithContext(props) {
  return (
    <Consumer>
      {context => (
        <ResultsWithoutSearchParams {...props} searchParams={context} />
      )}
    </Consumer>
  );
}

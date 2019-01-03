import React from "react";
import Pet from "./Pet";
import pf, { Pet as PetType, PetResponse, PetMedia } from "petfinder-client";
import SearchParams from "./SearchParams";
// import { Consumer } from "./SearchContext";
import { connect } from "react-redux";
import { RouteComponentProps, WindowLocation } from "@reach/router";
interface State {
  location: string;
  breed: string;
  animal: string;
}
interface PetState {
  pets: PetType[];
}
interface Props {
  search?: () => void;
  location?: string;
  breed?: string;
  animal?: string;
  breeds?: string[];
}
interface RouteProps {
  path: string;
}
if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("No API keys");
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
class Results extends React.Component<Props & RouteProps, PetState> {
  constructor(props: Props & RouteProps) {
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
        location: this.props.location ? this.props.location : "",
        animal: this.props.animal ? this.props.animal : "",
        breed: this.props.breed ? this.props.breed : ""
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
        <SearchParams search={this.search} />
        {this.state.pets.map((pet: PetType, index: number) => {
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

// function ResultsWithContext(props) {
//   return (
//     <Consumer>
//       {context => <Results {...props} searchParams={context} />}
//     </Consumer>
//   );
// }

const mapStateToProps = ({ location, breed, animal }: State) => ({
  location,
  breed,
  animal
});

export default connect(mapStateToProps)(Results);

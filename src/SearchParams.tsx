import React from "react";
import { ANIMALS } from "petfinder-client";
// import { Consumer } from "./SearchContext";
import { connect } from "react-redux";
import { Link, navigate } from "@reach/router";
import getBreeds from "./actionCreaters/getBreeds";
import changeLocation from "./actionCreaters/changeLocation";
import changeAnimal from "./actionCreaters/changeAnimal";
import changeBreed from "./actionCreaters/changeBreed";

interface State {
  location: string;
  breed: string;
  animal: string;
  breeds: string[];
}
interface Props {
  search?: () => void;
  location?: string;
  breed?: string;
  animal?: string;
  breeds?: string[];
  path?: string;
  handleAnimalChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBreedChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLocationChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
// SearchParams class for search component to be called independently
// or from the Results component
class SearchParams extends React.Component<Props> {
  public onSubmit() {
    navigate("/Results");
  }
  public render() {
    return (
      // <Consumer>
      //   {context => (
      <div className="search-params">
        <label htmlFor="location">
          {this.props.location}
          <input
            id="location"
            value={this.props.location}
            placeholder="Location"
            onChange={this.props.handleLocationChange} // {this.props.updateStateArrow}
            onBlur={this.props.handleLocationChange} // {this.props.updateStateArrow}
          />
        </label>
        <label htmlFor="animal">
          {this.props.animal}
          <select
            id="animal"
            value={this.props.animal}
            onChange={this.props.handleAnimalChange} // {this.props.updateStateArrow}
            onBlur={this.props.handleAnimalChange} // {this.props.updateStateArrow}
          >
            <option />
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          <select
            id="breed"
            value={this.props.breed}
            onChange={this.props.handleBreedChange}
            disabled={!(this.props.breeds ? this.props.breeds.length : 0)}
          >
            <option />
            {this.props.breeds
              ? this.props.breeds.map(breed => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))
              : null}
          </select>
        </label>
        <button onClick={this.props.search ? this.props.search : this.onSubmit}>
          Submit
        </button>
      </div>
      //   )}
      // </Consumer>
    );
  }
}

const mapStateToProps = ({ breed, breeds, animal, location }: State) => ({
  breed,
  breeds,
  location,
  animal
});

const mapDispatchToProps = (dispatch: any) => ({
  handleAnimalChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(changeAnimal(event.target.value));
    dispatch(getBreeds());
  },
  handleBreedChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(changeBreed(event.target.value));
  },
  handleLocationChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(changeLocation(event.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchParams);

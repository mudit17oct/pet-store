import React from "react";
import { ANIMALS } from "petfinder-client";
//import { Consumer } from "./SearchContext";
import { connect } from "react-redux";
import { Link, navigate } from "@reach/router";
import getBreeds from "./actionCreaters/getBreeds";
import changeLocation from "./actionCreaters/changeLocation";
import changeAnimal from "./actionCreaters/changeAnimal";
import changeBreed from "./actionCreaters/changeBreed";

class SearchParams extends React.Component {
  onSubmit() {
    navigate("/Results");
  }
  render() {
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
            onChange={this.props.handleLocationChange} //{this.props.updateStateArrow}
            onBlur={this.props.handleLocationChange} //{this.props.updateStateArrow}
          />
        </label>
        <label htmlFor="animal">
          {this.props.animal}
          <select
            id="animal"
            value={this.props.animal}
            onChange={this.props.handleAnimalChange} //{this.props.updateStateArrow}
            onBlur={this.props.handleAnimalChange} //{this.props.updateStateArrow}
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
            disabled={!this.props.breeds.length}
          >
            <option />
            {this.props.breeds.map(breed => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
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
const mapStateToProps = ({ breed, breeds, animal, location }) => ({
  breed,
  breeds,
  location,
  animal
});

const mapDispatchToProps = dispatch => ({
  handleAnimalChange(event) {
    dispatch(changeAnimal(event.target.value));
    dispatch(getBreeds());
  },
  handleBreedChange(event) {
    dispatch(changeBreed(event.target.value));
  },
  handleLocationChange(event) {
    dispatch(changeLocation(event.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchParams);

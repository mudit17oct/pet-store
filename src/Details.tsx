import React from "react";
import pf, { PetResponse, PetMedia } from "petfinder-client";
import { navigate, RouteComponentProps } from "@reach/router";
import Carousel from "./Carousel";
import Modal from "./Modal";
interface Props {
  id?: string;
}

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("No API keys");
}
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component<Props & RouteComponentProps> {
  public state = {
    loading: true,
    showModal: true,
    name: "",
    animal: "",
    breed: "",
    location: "",
    description: "",
    media: {} as PetMedia
  };

  public componentWillMount() {
    if (!this.props.id) {
      return;
    }
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then((data: PetResponse) => {
        let breed;
        const pet = data.petfinder.pet;
        if (!pet) {
          navigate("/");
          return;
        }
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }
        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city},${pet.contact.state}`,
          description: pet.description,
          breed,
          loading: false,
          media: pet.media
        });
      })
      .catch(() => {
        navigate("/");
      });
  }
  public toggleModal = () =>
    this.setState({ showModal: !this.state.showModal });
  public render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }
    const {
      name,
      animal,
      breed,
      location,
      description,
      media,
      showModal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <h1>
          {name}-{animal}-{breed}
        </h1>
        <button onClick={this.toggleModal}>Adopt {name}</button>
        <p>{description}</p>
        {showModal ? (
          <Modal>
            <h1>Would you like to adopt {name}?</h1>
            <div className="buttons">
              <button onClick={this.toggleModal}>Yes</button>
              <button onClick={this.toggleModal}>No</button>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default Details;

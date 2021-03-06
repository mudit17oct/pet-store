import React from "react";
import { PetMedia, PetPhoto } from "petfinder-client";
interface Props {
  media: PetMedia;
}
interface State {
  photos: PetPhoto[];
  active: number;
}
class Carousel extends React.Component<Props, State> {
  public state = {
    photos: [],
    active: 0
  };
  public static getDerivedStateFromProps({ media }: Props) {
    let photos: PetPhoto[] = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }
  public handleIndexclick = (event: React.MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index
      });
    }
  };
  public render() {
    const photos: PetPhoto[] = this.state.photos;
    const active = this.state.active;

    return (
      <div className="carousel">
        <img src={photos[active].value} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo: PetPhoto, index) => {
            /* eslint-disable-next-line */
            return (
              <img
                onClick={this.handleIndexclick}
                key={photo.value}
                data-index={index}
                src={photo.value}
                className={index === active ? "active" : ""}
                alt="animal thumbnail"
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;

import React from "react";
import { Link } from "@reach/router";
class Pet extends React.Component {
  render() {
    const { name, animal, breed, media, location, id } = this.props;
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }
    const hero = photos[0]
      ? photos[0].value
      : "https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png";
    return (
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={hero} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
        </div>
      </Link>
    );
  }
}
// const Pet = props => {
//   return React.createElement("div", {}, [
//     React.createElement("h2", {}, props.name),
//     React.createElement("h3", {}, props.type),
//     React.createElement("h3", {}, props.breed)
//   ]);
//   return (
//     <div>
//       <h1>{props.name}</h1>
//       <h2>{props.type}</h2>
//       <h3>{props.breed}</h3>
//     </div>
//   );
// };

export default Pet;

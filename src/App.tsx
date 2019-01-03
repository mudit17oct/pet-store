import React from "react";
import ReactDOM from "react-dom";
import Results from "./Results";
import { Router, Link, RouteComponentProps } from "@reach/router";
import Details from "./Details";
import pf from "petfinder-client";
// import { Provider } from "./SearchContext";
import SearchParams from "./SearchParams";
import ResultsWithoutSearchParams from "./ResultsWithoutSearchParams";
// import Loadable from "react-loadable";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

// const petfinder = pf({
//   key: process.env.API_KEY,
//   secret: process.env.API_SECRET
// });

// const LoadableDetails = Loadable({
//   loader: () => import("./Details"),
//   loading() {
//     return <h1>Loading Details...</h1>;
//   }
// });
interface ISignupPageProps extends RouteComponentProps {
  path: string;
}
class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     animal: "",
  //     breed: "",
  //     breeds: [],
  //     updateStateArrow: this.updateStateArrow,
  //     //updateStateBind: this.updateStateBind,
  //     handleBreedChange: this.handleBreedChange,
  //     getBreeds: this.getBreeds
  //   };
  // }
  // updateStateArrow = event => {
  //   if (event.target.id == "location")
  //     this.setState({
  //       location: event.target.value
  //     });
  //   else if ((event.target.id = "animal"))
  //     this.setState(
  //       {
  //         animal: event.target.value,
  //         breed: ""
  //       },

  //       this.getBreeds
  //     );
  // };
  // updateStateBind(event) {
  //   if (event.target.id == "location")
  //     this.setState({
  //       location: event.target.value
  //     });
  //   else if ((event.target.id = "animal")) {
  //     this.setState(
  //       {
  //         animal: event.target.value,
  //         breed: ""
  //       },
  //       this.getBreeds
  //     );
  //   }
  // }
  // handleBreedChange = event => {
  //   this.setState({
  //     breed: event.target.value
  //   });
  // };
  // getBreeds() {
  //   if (this.state.animal) {
  //     petfinder.breed.list({ animal: this.state.animal }).then(data => {
  //       if (
  //         data.petfinder &&
  //         data.petfinder.breeds &&
  //         Array.isArray(data.petfinder.breeds.breed)
  //       ) {
  //         this.setState({ breeds: data.petfinder.breeds.breed });
  //       } else {
  //         this.setState({ breeds: [] });
  //       }
  //     });
  //   } else {
  //     this.setState({ breeds: [] });
  //   }
  // }
  public render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <ReduxProvider store={store}>
          {/* <Provider> */}
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
            <ResultsWithoutSearchParams path="/Results" />
          </Router>
          {/* </Provider> */}
        </ReduxProvider>
      </div>
    );
  }
}
// ReactDOM.render(<App />, document.getElementById("root"));
export default App;

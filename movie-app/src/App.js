import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


// import pages
import Home from "./Home";
import SingleMovie from "./SingleMovie";
import SingleShow from "./SingleShow";
import Reviews from "./Reviews";
import Images from "./Images";
import Trivia from "./Trivia";
import CrazyCredits from "./CrazyCredits.js";

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/reviews/:id">
          <Reviews></Reviews>
        </Route>
        <Route path="/images/:id">
          <Images></Images>
        </Route>
        <Route path="/movie/:id">
          <SingleMovie></SingleMovie>
        </Route>
        <Route path="/tvSeries/:id">
          <SingleShow></SingleShow>
        </Route>
        <Route path="/trivia/:id">
          <Trivia/>
        </Route>
        <Route path="/credits/:id">
          <CrazyCredits/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

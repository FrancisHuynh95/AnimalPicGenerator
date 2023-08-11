import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home";

function App() {
  return (
    <>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </>
  );
}

export default App;

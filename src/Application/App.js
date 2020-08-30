import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginView from "../Application/Views/LoginView";
import HomeView from "./Views/HomeView";
import ModulesView from "./Views/ModulesView";

const App = () => {
  console.log(process.env.PUBLIC_URL);
  return (
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route path="/login" component={LoginView} />
      {/* <Route to="/logout" component={LoginView} /> */}
      <Route path="/grasp" component={ModulesView} />
      <Route render={(props) => <h1>Not found</h1>} />
    </Switch>
  );
};

export default App;

import { Switch } from "react-router-dom";
import Route from "./Route";
import SignIn from "../Pages/Login";
import Home from "../Pages/Home";
import Importacao from "../Pages/Importacao";
import Honorarios from "../Pages/Honorarios";

export default function Routes() {
  return (
      <Switch>
        <Route exact path="/" component={SignIn}  />
        <Route exact path="/home" component={Home} isPrivate />
        <Route exact path="/importacao" component={Importacao} isPrivate />
        <Route exact path="/honorarios" component={Honorarios} isPrivate />
      </Switch>
  );
}

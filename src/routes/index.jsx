import { Switch } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Calculasdoras from '../Pages/Calculadoras';
import Route from './Route';



export default function Routes(){
    return(
        <Switch>
            <Route exact path = '/' component={Login} />
            <Route exact path = '/home' component={Home} isPrivate />
            <Route exact path = '/calculadoras' component={Calculasdoras} isPrivate />
        </Switch>
    )
}
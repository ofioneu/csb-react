import { Switch } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Calculasdoras from '../Pages/Calculadoras';
import Sp from '../Pages/SaoPaulo'
import Am from  '../Pages/Manaus'
import Downloads from '../Pages/Downloads'
import Route from './Route';



export default function Routes(){
    return(
        <Switch>
            <Route exact path = '/' component={Login} />
            <Route exact path = '/home' component={Home} isPrivate />
            <Route exact path = '/calculadoras' component={Calculasdoras} isPrivate />
            <Route exact path = '/sp' component={Sp} isPrivate />
            <Route exact path = '/am' component={Am} isPrivate />
            <Route exact path = '/downloads' component={Downloads} isPrivate />
        </Switch>
    )
}
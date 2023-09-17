import { Switch } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Calculasdoras from '../Pages/Calculadoras';
import PartsTable from '../Pages/PartsTable';
import ImportacaoForm from '../Pages/Importacao';
import EANGenerator from '../Pages/Ean';
import Route from './Route';





export default function Routes(){
    return(
        <Switch>
            <Route exact path = '/' component={Login} />
            <Route exact path = '/home' component={Home} isPrivate />
            <Route exact path = '/importacao' component={ImportacaoForm} isPrivate />
            <Route exact path = '/calculadoras' component={Calculasdoras} isPrivate />
            <Route exact path = '/partsTable' component={PartsTable} isPrivate />
            <Route exact path = '/ean' component={EANGenerator} isPrivate />
        </Switch>
    )
}
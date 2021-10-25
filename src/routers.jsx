import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HeaderPages from './Components/Headers';
import Home from './Pages/Home'
import Importacao from './Pages/Importacao';
import Comissao from './Pages/Comissao';


const Routes = () => {
    return(
               
        <BrowserRouter>
        <HeaderPages/> 
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/importacao' component={Importacao}/>
                <Route exact path='/comissao' component={Comissao}/>
            </Switch>
        </BrowserRouter>
    )
}


export default Routes
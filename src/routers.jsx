import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HeaderPages from './Components/Headers';
import Home from './Pages/Home'
import Importacao from './Pages/Importacao';
import Honorarios from './Pages/Honorarios';


const Routes = () => {
    return(
               
        <BrowserRouter>
        <HeaderPages/> 
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/importacao' component={Importacao}/>
                <Route exact path='/honorarios' component={Honorarios}/>
            </Switch>
        </BrowserRouter>
    )
}


export default Routes
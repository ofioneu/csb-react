import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HeaderPages from './Components/Headers';
import Home from './Pages/Home'
import Frete from './Pages/Frete';
import Comissao from './Pages/Comissao';


const Routes = () => {
    return(
               
        <BrowserRouter>
        <HeaderPages/> 
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/frete' component={Frete}/>
                <Route exact path='/comissao' component={Comissao}/>
            </Switch>
        </BrowserRouter>
    )
}


export default Routes
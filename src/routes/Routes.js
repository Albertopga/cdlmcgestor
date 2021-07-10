import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Pages
import Home from '../pages/Home';
import Settings from '../pages/Settings/Settings';

export default function Routes(props) {
  const { user, setReloadApp } = props;
  
  return (
    <Switch>
      <Route path="/" exact> 
        <Home/>
      </Route>
      <Route path="/create-order" exact>
        <h1>Confirmar pedido</h1>
      </Route>
      <Route path="/settings" exact>
        <Settings user={user} setReloadApp={setReloadApp}/>
      </Route>
      <Route path="/orders" exact>
        <h1>Listado de pedidos</h1>
      </Route>
    </Switch>
  )
}

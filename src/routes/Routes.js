import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Pages
import Home from '../pages/Home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact> 
        <Home/>
      </Route>
      <Route path="/create-order" exact>
        <h1>Confirmar pedido</h1>
      </Route>
      <Route path="/settings" exact>
        <h1>Configuración de cuenta</h1>
      </Route>
      <Route path="/orders" exact>
        <h1>Listado de pedidos</h1>
      </Route>
    </Switch>
  )
}

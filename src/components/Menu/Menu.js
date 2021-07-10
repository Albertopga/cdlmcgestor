import React, { useState, useEffect } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link, withRouter} from 'react-router-dom'

import './style.scss'

function LeftBar(props) {
  const { user, location } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname)

  const handlerMenu = ( (e, menu) =>{
    setActiveMenu(menu.to)
  })
  return (
    <Menu className='menu' vertical>
      <div className='top'>
        <Menu.Item as={Link} to='/' name='home' active={activeMenu === '/'} onClick={handlerMenu}>
          <Icon name='home'/> Inicio
        </Menu.Item>
        <Menu.Item as={Link} to='/orders' name='order' active={activeMenu === '/orders'} onClick={handlerMenu}>
          <Icon name='ordered list'/> Pedidos
        </Menu.Item>
        <Menu.Item as={Link} to='/create-order' active={activeMenu === '/create-order'} onClick={handlerMenu}>
          <Icon name='plus square outline'/> Nuevo pedido
        </Menu.Item>
      </div>
    </Menu>
  )
}
export default withRouter(LeftBar)

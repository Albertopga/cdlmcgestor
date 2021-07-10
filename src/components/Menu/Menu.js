import React, { useState, useEffect } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link, withRouter} from 'react-router-dom'
import { isUserAdmin } from '../../utils/Api'
import BasicModal from '../Modals/BasicModal'
import './style.scss'

function LeftBar(props) {
  const { user, location } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setcontentModal] = useState(null);

  console.log(userAdmin)
  useEffect(() => {
    isUserAdmin(user.uid)
    .then( res =>{
      setUserAdmin(res);
    });
  }, [user])

  const handlerMenu = ( (e, menu) =>{
    setActiveMenu(menu.to)
  })

  const handlerModal = (type) =>{
    switch (type) {
      case 'new-order':
        setTitleModal('Nuevo Pedido');
        setcontentModal('<h2>Formulario Nuevo pedido</h2>');
        setShowModal(true);
        break;
    
      default:
        setTitleModal(null);
        setcontentModal(null);
        setShowModal(false);
        break;
    }
    
  }
  return (
    <>
      <Menu className='menu' vertical>
        <div className='top'>
          <Menu.Item as={Link} to='/' name='home' active={activeMenu === '/'} onClick={handlerMenu}>
            <Icon name='home'/> Inicio
          </Menu.Item>
          <Menu.Item as={Link} to='/orders' name='order' active={activeMenu === '/orders'} onClick={handlerMenu}>
            <Icon name='ordered list'/> Pedidos
          </Menu.Item>
          {userAdmin && (
          <Menu.Item as={Link} to='/create-order' active={activeMenu === '/create-order'} onClick={() =>handlerModal('new-order') }>
            <Icon name='plus square outline'/> Nuevo pedido
          </Menu.Item>
          )}
          
        </div>
      </Menu>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal} size='tiny'>
        {contentModal}
      </BasicModal>
    </>
  )
}
export default withRouter(LeftBar)

import React, { useState, useEffect } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link, withRouter} from 'react-router-dom'
import { isUserAdmin } from '../../utils/Api'
import BasicModal from '../Modals/BasicModal'
import AddOrderForm from '../Orders/AddOrderForm/AddOrderForm'

import './style.scss'

function LeftBar(props) {
  const { user, location } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setcontentModal] = useState(null);


  useEffect(() => {
    isUserAdmin(user.uid)
    .then( res =>{
      setUserAdmin(res);
    });
  }, [user])

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  const handlerModal = (type) =>{
    switch (type) {
      case 'new-order':
        setTitleModal('Nuevo Pedido');
        setcontentModal(<AddOrderForm/>);
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
          <Menu.Item as={Link} to='/' name='home' active={activeMenu === '/'}>
            <Icon name='home'/> Inicio
          </Menu.Item>
          <Menu.Item as={Link} to='/orders' name='order' active={activeMenu === '/orders'}>
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

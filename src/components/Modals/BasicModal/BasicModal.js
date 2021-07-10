import React from 'react'
import { Modal, Icon } from 'semantic-ui-react'
import './style.scss'

export default function BasicModal(props) {
  const { show, setShow, title, children, size } = props
  const onClose = () => setShow(false)

  return (
    <Modal className='basic-modal' open={show} onClose={onClose} size={size}>
      <Modal.Header>
        <h3>{title}</h3>
        <Icon name='close' onClick={onClose}/>
      </Modal.Header>
      <Modal.Content>
        {children}
      </Modal.Content>
    </Modal>
  )
}

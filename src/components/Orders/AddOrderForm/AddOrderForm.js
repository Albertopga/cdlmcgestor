import React, { useState } from 'react'
import { Form, Input, Accordion, Button, Icon, TextArea } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import UploadFiles from '../../UploadFiles/UploadFiles';

import './style.scss'

export default function AddOrderForm() {  
  const [formData, setFormData] = useState({})
  const [activeIndex, setActiveIndex] = useState()

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }

  const onSubmit= ()=>{

    console.log("validamos??")
    setFormData({})
  }

  const onChange= e=>{
    if(e.target.files){
      formData['files'] = e.target.files
    }else{
      formData[e.target.id] = e.target.value
    }
  }

  return (
    <Form className='add-order-form' onSubmit={onSubmit} onChange={onChange}>
      <h4>Datos personales </h4>
      <Form.Group>
        <Form.Field width={7}> 
          <Input id="name" placeholder='Nombre *'/>
        </Form.Field>
        <Form.Field width={5}>
          <Input id='f-surname' placeholder='Primer apellido *'/>
        </Form.Field>
        <Form.Field width={5}>
          <Input id='s-surname' placeholder='Segundo apellido *'/>
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field width={8}>
          <Input id='email' placeholder='Email'/>
        </Form.Field>
        <Form.Field width={4}>
          <Input id='user-id' placeholder='DNI *'/>
        </Form.Field>
        <Form.Field width={4}>
          <Input id='phone' placeholder='Teléfono *'/>
        </Form.Field>
      </Form.Group>

      <h4>Dirección Facturación </h4>
      <Form.Field width={16}> 
        <Input id='bill-address' placeholder='Dirección *'/>
      </Form.Field>
      <Form.Field width={16}> 
        <Input id='bill-address-complement' placeholder='Complemento de dirección'/>
      </Form.Field>
      <Form.Group>
        <Form.Field width={5}>
          <Input id='bill-zip-code' placeholder='Código postal *'/>
        </Form.Field>
        <Form.Field width={11}>
          <Input id='bill-city' placeholder='Población *'/>
        </Form.Field>
      </Form.Group>
        <Form.Field width={5}>
          <Input id='bill-state' placeholder='Provincia *'/>
        </Form.Field>

      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
          >
          Detalle de pedido 
          <Icon name='dropdown' />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Form.Field>
            <Input id='product' placeholder='Producto'/>
          </Form.Field>
          <Form.Field>
            <Input id='description' placeholder='Descripción'/>
          </Form.Field>
          <Form.Field>
            <Input id='price' placeholder='Precio' type='number'/>
          </Form.Field>
          <Form.Field>
            <TextArea id='details' placeholder='Observaciones'/>            
          </Form.Field>
          <Form.Field className='upload-files'>
            <h4>Imágenes enviadas por el cliente</h4>
            <UploadFiles/>
            <hr/>
          </Form.Field>
        </Accordion.Content>
      </Accordion> 

      <Accordion>
        <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            Dirección de envio <span>En caso de ser distinta a la de Facturación</span> 
            <Icon name='dropdown' />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <Form.Field width={16}> 
          <Input id='delivery-address' placeholder='Dirección'/>
          </Form.Field>
          <Form.Field width={16}> 
            <Input id='delivery-address-complement' placeholder='Complemento de dirección'/>
          </Form.Field>
          <Form.Group>
            <Form.Field width={5}>
              <Input id='delivery-zip-code' placeholder='Código postal'/>
            </Form.Field>
            <Form.Field width={11}>
              <Input id='delivery-city' placeholder='Población'/>
            </Form.Field>
          </Form.Group>
            <Form.Field width={5}>
              <Input id='delivery-state' placeholder='Provincia'/>
            </Form.Field>
        </Accordion.Content>
      </Accordion>
      <Button type='submit'>Crear pedido</Button>
    </Form>      
  )
}

/* Datos del pedido:
producto, descripción precio con iva, observaciones 

*/

{/* <Accordion>
  <Accordion.Title
      active={activeIndex === 0}
      index={0}
      onClick={handleClick}
    >
    Titulo 
    <Icon name='dropdown' />
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 0}>
  </Accordion.Content>
</Accordion> */}
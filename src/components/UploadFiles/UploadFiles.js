import React, { useState, useCallback } from 'react'
import {useDropzone} from 'react-dropzone';
import { Icon } from 'semantic-ui-react';
import './style.scss'

export default function UploadFiles() {
  const [selectedFiles, setSelectedFiles] = useState([])
  
  const onDrop = useCallback(acceptedFiles =>{
    const files = acceptedFiles.map( file => (
      <li key={file.path}>
        {file.name} - {file.size} bytes 
      </li>
    ));
    
    setSelectedFiles(files)
  })
  
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/png, image/jpeg',
    noKeyboard: true,
    onDrop
  });

  const deleteFiles =()=>{   
    // TODO hacer que se puedan borrar de uno en uno
    setSelectedFiles([])
  }
    
  
  
  
  return (
    <section className="upload-files">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Arrasta y suelta las imágenes, o pincha para seleccionar</p>
      </div>
      <aside>
        <h4>Archivos seleccionadas <span><Icon name="trash" link onClick={()=>deleteFiles()}/></span></h4>
        <ul>{selectedFiles}</ul>
      </aside>
    </section>
  );
}

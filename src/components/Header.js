import React, { useState, useEffect } from "react";

export default function Header(props) {
  const { title = 'Sin titulo' } = props;
  const [state, setState] = useState();

  useEffect(() => {
    
  }, [])
  
  return(
    <h1> { title } </h1>
  )
}


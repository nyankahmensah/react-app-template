import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import 'assets/css/wrap-image.css'

const wrapImage = (img: any) => {
  
  return (
    <Zoom classDialog='custom-zoom' >
      {img}
    </Zoom>
  )
}

export default wrapImage
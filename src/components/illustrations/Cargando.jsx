import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import ImagenCargando from './Cargando.svg'

const CargandoLayout = styled(Typography)`
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: center;
  justify-items: center;
  background-color: #8D9B90;
  padding: 16px;
`

const ImagenFondo = styled(ImagenCargando)`
  display:block;
  margin:0 auto;
  animation: floating 5s ease-in-out infinite;

  @keyframes floating{
    0%{transform:translateY(0px)}
    50%{transform:translateY(20px)}
    100%{transform:translateY(0px)}
  }

  #steam1{  animation: puff 2s linear infinite;}

  @keyframes puff{
    0%{opacity:0; y:0}
    50%{opacity:1; transform:translateX(-30px)}
    100%{opacity:0; transform:translateX(-50px) }
  }

  #steam2{  animation: puffpuff 2.5s linear 1s infinite;}

  @keyframes puffpuff{
    0%{opacity:0; y:0}
    50%{opacity:1; transform:translateX(-30px)}
    100%{opacity:0; transform:translateX(-50px) }
  }
`

export default function Cargando() {
  return (
    <CargandoLayout component="div">
      <ImagenFondo></ImagenFondo>
      <Box fontSize="h5.fontSize" style={{ color: 'white' }}>En construcción</Box>
    </CargandoLayout>
  ) 
}

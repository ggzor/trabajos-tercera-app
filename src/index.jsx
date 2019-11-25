import React, { useState, forwardRef } from 'react'
import { render } from 'react-dom'
import { useSpring, config, animated } from 'react-spring'

import ImagenSaludOriginal from './components/illustrations/Salud.svg'

import styled from 'styled-components'

import { Link as RouterLink, BrowserRouter, useLocation, Switch, Route } from 'react-router-dom'

import Home from '@material-ui/icons/Home'
import ColorLens from '@material-ui/icons/ColorLens'
import DirectionsBus from '@material-ui/icons/DirectionsBus'
import Done from '@material-ui/icons/Done'
import Health from './components/icons/Salud'
import Info from '@material-ui/icons/Info'

import { makeStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'

import ImagenPerfil from './images/perfil.png'
import ImagenDoctor1 from './images/doctor1.jpeg'
import ImagenDoctor2 from './images/doctor2.jpg'
import PildoraIcon from './components/icons/Pildora'
import NatacionIcon from './components/icons/Natacion'
import YogaIcon from './components/icons/Yoga'

const LinkTo = forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)

import Cargando from './components/illustrations/Cargando'


const datos = {
  tareas: [
    { 
      tipo: 'pastilla', 
      nombre: 'Omeoprazol', 
      dosis: '10mg (2 pastillas)',
      color: 'red',
      inicio: new Date('2019-11-13T08:30'),
      frecuencia: { unidad: 'horas', cantidad: 12 } 
    },
    {
      tipo: 'pastilla', 
      nombre: 'Acetaminofeno', 
      dosis: '300mg',
      color: 'blue',
      inicio: new Date('2019-11-13T09:00'),
      frecuencia: { unidad: 'horas', cantidad: 6 } 
    },
    {
      tipo: 'consulta',
      nombre: 'Juan Carlos Baez',
      foto: 'doctor1',
      tratamiento: 'Diabetez',
      fecha: new Date('2019-11-13T10:30')
    },
    {
      tipo: 'consulta',
      nombre: 'María de la Luz Jimenez',
      foto: 'doctor2',
      tratamiento: 'Actividad Física',
      fecha: new Date('2019-11-13T10:30')
    },
    {
      tipo: 'actividad',
      nombre: 'Natación',
      lugar: 'Ciudad Universitaria',
      dias: [0, 3, 5],
      hora: [9, 30]
    }
  ]
}

const useStyles = makeStyles({
  root: {
    width: '100vw'
  },
})

const BottomNavBar = () => {
  const classes = useStyles()

  const { pathname } = useLocation()
  const index = ['/', '/salud', '/actividades', '/transporte'].indexOf(pathname)

  return (
    <Box boxShadow={3}>
      <BottomNavigation
        value={index}
        className={classes.root}
      >
        <BottomNavigationAction label="Inicio"      icon={<Home />}          component={LinkTo} to="/" />
        <BottomNavigationAction label="Salud"       icon={<Health />}        component={LinkTo} to="/salud" />
        <BottomNavigationAction label="Actividades" icon={<ColorLens />}     component={LinkTo} to="/actividades" />
        <BottomNavigationAction label="Transporte"  icon={<DirectionsBus />} component={LinkTo} to="/transporte" />
        <BottomNavigationAction label="Información" icon={<Info />}          component={LinkTo} to="/info" />
      </BottomNavigation>
    </Box>
  )
}

const AppMainLayout = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100vh;
`

const InicioLayout = styled.div`
  height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-rows: auto 1fr;
`

const InicioTop = styled.div`
  padding: 1.5em;
  width: 100vw;
  height: 15vh;
  min-height: 90px;
  max-height: 120px;
  background-color: #3f51b5;
  border-radius: 0px 0px 20px 20px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto;
`

const useListStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
}));

const Inicio = () => {
  const classes = useListStyles();
  return (
    <InicioLayout>
      <InicioTop>
        <Typography style={{color: 'white'}} component="div">
          <Box style={{opacity: 0.6}}>Buenos días</Box>
          <Box fontWeight="fontWeightMedium" fontSize="h6.fontSize">Juan López Juárez</Box>
        </Typography>
        <Avatar alt="Perfil" src={ImagenPerfil} style={{ width: 60, height: 60 }}/>
      </InicioTop>
      <div style={{ height: '100%', overflowY: 'auto' }}>
        <List className={classes.root}>
          <ListSubheader>Pastillas</ListSubheader>

          <ListItem button>
            <ListItemIcon>
                <PildoraIcon style={{ color: 'crimson' }} />
            </ListItemIcon>
            <ListItemText primary="Omeoprazol 10mg (2 pastillas)" secondary="08:30 - Con retraso" />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <Done />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
                <PildoraIcon style={{ color: 'dodgerblue' }} />
            </ListItemIcon>
            <ListItemText primary="Acetaminofeno 300mg" secondary="09:00 - En 15 minutos" />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <Done />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListSubheader>Consultas</ListSubheader>

          <ListItem button>
            <ListItemAvatar>
              <Avatar alt="Doctor Juan Carlos Baez" src={ImagenDoctor1} />
            </ListItemAvatar>
            <ListItemText primary="Diabetez - Juan Carlos Baez" secondary="Miércoles a las 10:30" />
          </ListItem>

          <ListItem button>
            <ListItemAvatar>
              <Avatar alt="Doctor Juan Carlos Baez" src={ImagenDoctor2} />
            </ListItemAvatar>
            <ListItemText primary="Actividad Física - María de la Luz Jimenez" secondary="Viernes a las 09:00" />
          </ListItem>

          <ListSubheader>Actividades</ListSubheader>
          <ListItem button>
            <ListItemIcon>
                <NatacionIcon />
            </ListItemIcon>
            <ListItemText primary="Natación - Ciudad Universitaria" secondary="De 08:30 a 09:30" />
          </ListItem>
        </List>

        <ListItem button>
            <ListItemIcon>
                <ColorLens />
            </ListItemIcon>
            <ListItemText primary="Pintura" secondary="De 14:30 a 15:30" />
        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <YogaIcon />
            </ListItemIcon>
            <ListItemText primary="Yoga" secondary="De 19:30 a 20:30" />
        </ListItem>
      </div>
    </InicioLayout>
  )
}

const ImagenSalud = styled(ImagenSaludOriginal)`
  width: 10vmax;
`

const SaludLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`

const Salud = () => {
  return (
    <SaludLayout>
      <Cargando></Cargando>
    </SaludLayout>
  )
}

const ActividadesLayout = SaludLayout

const Actividades = () => {
  return (
    <ActividadesLayout>
      <Cargando></Cargando>
    </ActividadesLayout>
  )
}

const TransporteLayout = SaludLayout

const Transporte = () => {
  return (
    <TransporteLayout>
      <Cargando></Cargando>
    </TransporteLayout>
  )
}

const InformacionLayout = styled.div`

`

const Informacion = () => {
  return (
    <InformacionLayout>

    </InformacionLayout>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppMainLayout>
        <Switch>
          <Route exact path="/"            component={Inicio} />
          <Route path="/salud"       component={Salud} />
          <Route path="/actividades" component={Actividades} />
          <Route path="/transporte"  component={Transporte} />
        </Switch>
        <BottomNavBar />
      </AppMainLayout>
    </BrowserRouter>
  )
}

render(<App />, document.getElementById('app'))

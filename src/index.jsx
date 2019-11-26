import React, { useState, forwardRef, useReducer } from 'react'
import { render } from 'react-dom'
import { useSpring, config, animated } from 'react-spring'

import reducirEstado from './model/Reduccion'
import { determinarEventosHoy } from './model/Store'

import ImagenSaludOriginal from './components/illustrations/Salud.svg'

import styled from 'styled-components'

import { Link as RouterLink, BrowserRouter, useLocation, Switch, Route } from 'react-router-dom'

import Home from '@material-ui/icons/Home'
import ColorLens from '@material-ui/icons/ColorLens'
import Car from '@material-ui/icons/DirectionsCar'
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
import PildoraIcon from './components/icons/Pildora'
import NatacionIcon from './components/icons/Natacion'
import YogaIcon from './components/icons/Yoga'

const LinkTo = forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)

import Cargando from './components/illustrations/Cargando'

const datos = {
  paciente: 'Juan López Juárez',
  pastillas: [
    { 
      nombre: 'Omeoprazol',
      color: 'crimson',
      dosis: '10mg (2 pastillas)',
      periodo: 8,
      ultimaAplicacion: '2019-11-25T00:30'
    },
    {
      nombre: 'Acetiminofeno',
      color: 'dodgerblue',
      dosis: '300mg',
      periodo: 9,
      ultimaAplicacion: '2019-11-25T00:15' 
    }
  ],
  doctores: [
    {
      nombre: 'María de la Luz Jimenez',
      especialidad: 'Fisioterapeuta',
      consultas: [{ fecha: '2019-11-29T09:00', topico: 'Actividad física' }]
    },
    {
      nombre: 'Juan Carlos Baez',
      especialidad: 'Geriatra',
      consultas: [{ fecha: '2019-11-27T10:30', topico: 'Diabetez' }]
    }
  ],
  actividades: [
    { 
      nombre: 'Natación', 
      horas: ['08:30 a.m.', '09:30 a.m.'], 
      dias: [1, 2, 3, 5] 
    },
    { 
      nombre: 'Pintura', 
      horas: ['14:30', '15:30'], 
      dias: [1, 3, 5] 
    },
    { 
      nombre: 'Yoga', 
      horas: ['19:30', '20:30'], 
      dias: [1, 3, 5] 
    }
  ],
  transportes: [
    { 
      inicio: 'Priv. Ingeniería Química #1809', 
      destino: 'Hospital Puebla',
      vehiculo: 'Versa Blanco',
      fecha: '2019-11-26T17:00'
    }
  ]
}


const useStyles = makeStyles({
  root: {
    width: '100vw',
    overflow: 'hidden'
  },
})

const BottomNavBar = () => {
  const classes = useStyles()

  const { pathname } = useLocation()
  const index = ['/', '/registro', '/informacion'].indexOf(pathname)

  return (
    <Box boxShadow={3}>
      <BottomNavigation
        value={index}
        className={classes.root}
        showLabels
      >
        <BottomNavigationAction label="Inicio"      icon={<Home />}   component={LinkTo} to="/" />
        <BottomNavigationAction label="Registro"    icon={<Health />} component={LinkTo} to="/registro" />
        <BottomNavigationAction label="Información" icon={<Info />}   component={LinkTo} to="/informacion" />
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

const Inicio = ({ estado }) => {
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
          { estado.pastillas.length > 0 && (
              <div>
                <ListSubheader className={classes.root}>Pastillas</ListSubheader>
                {estado.pastillas.map(pastilla => (
                  <ListItem key={pastilla.nombre} button>
                    <ListItemIcon>
                        <PildoraIcon style={{ color: pastilla.color }} />
                    </ListItemIcon>
                    <ListItemText primary={`${pastilla.nombre} ${pastilla.dosis}`} secondary={pastilla.mensaje} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <Done />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </div>
          )}

          { estado.consultas.length > 0 && (
            <div>
              <ListSubheader className={classes.root}>Consultas</ListSubheader>
              {estado.consultas.map(consulta => (
                <ListItem key={consulta.nombre} button>
                  <ListItemAvatar>
                    <Avatar alt={consulta.nombre} src={`${consulta.nombre.split(' ').map(s => s.slice(0, 1)).join('').toLowerCase()}.jpeg`} />
                  </ListItemAvatar>
                  <ListItemText primary={`${consulta.topico} - ${consulta.nombre}`} secondary={consulta.mensaje} />
                </ListItem>
              ))}
            </div>
          )}

          {estado.actividades.length > 0 && (
            <div>
              <ListSubheader className={classes.root}>Actividades</ListSubheader>
              {estado.actividades.map(actividad => (
                <ListItem key={actividad.nombre} button>
                  <ListItemIcon>
                    { actividad.nombre == 'Natación' ? (<NatacionIcon />)
                    : actividad.nombre == 'Yoga' ? (<YogaIcon />)
                    : actividad.nombre == 'Pintura' && (<ColorLens />)
                    }
                  </ListItemIcon>
                  <ListItemText primary={actividad.nombre} secondary={actividad.mensaje} />
                </ListItem>
              ))}
            </div>
          )}

          {estado.transportes.length > 0 && (
            <div>
              <ListSubheader className={classes.root}>Transportes</ListSubheader>
              {estado.transportes.map(transporte => (
                <ListItem key={transporte.vehiculo} button>
                  <ListItemIcon>
                      <Car />
                  </ListItemIcon>
                  <ListItemText primary={`${transporte.vehiculo}`} secondary={`${transporte.mensaje} - De ${transporte.inicio} a ${transporte.destino}`} />
                </ListItem>
              ))}
            </div>
          )}
        </List>
      </div>
    </InicioLayout>
  )
}

const RegistroLayout = styled.div``

const Registro = () => {
  return (
  <InicioLayout>
    <InicioTop>
      <Typography style={{color: 'white'}} component="div">
        <Box style={{opacity: 0.6}}>Buenos días</Box>
        <Box fontWeight="fontWeightMedium" fontSize="h6.fontSize">Juan López Juárez</Box>
      </Typography>
      <Avatar alt="Perfil" src={ImagenPerfil} style={{ width: 60, height: 60 }}/>
    </InicioTop>
  </InicioLayout>)
}


const InformacionLayout = styled.div``

const Informacion = () => {
  return (
  <InformacionLayout>

  </InformacionLayout>)
}

const App = () => {
  const [{ estado, fecha }, despachar] = useReducer(reducirEstado, {
    estado: datos, 
    fecha: Date.now() 
  })

  return (
    <BrowserRouter>
      <AppMainLayout>
        <Switch>
          <Route exact path="/"      render={() => <Inicio estado={determinarEventosHoy(estado, fecha)}></Inicio>} />
          <Route path="/registro"    component={() => <Registro {...{ estado, fecha }}></Registro>} />
          <Route path="/informacion" component={Informacion} />
        </Switch>
        <BottomNavBar />
      </AppMainLayout>
    </BrowserRouter>
  )
}

render(<App />, document.getElementById('app'))

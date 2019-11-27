import React, { useState, forwardRef, useReducer, useEffect } from 'react'
import { render } from 'react-dom'
import { useSpring, config, animated } from 'react-spring'

import { reducirEstado } from './model/Reduccion'
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
import Delete from '@material-ui/icons/Delete'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import MyLocation from '@material-ui/icons/MyLocation'

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
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'
import RegistroIcon from '@material-ui/icons/AssignmentTurnedIn'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'

import ImagenPerfil from './images/perfil.png'
import PildoraIcon from './components/icons/Pildora'
import NatacionIcon from './components/icons/Natacion'
import YogaIcon from './components/icons/Yoga'

const LinkTo = forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)

import Cargando from './components/illustrations/Cargando'
import { formatDistance, format, addHours } from 'date-fns'
import { es } from 'date-fns/locale'
import { sample, intersection, union, difference } from 'lodash-es'

const datos = {
  paciente: 'Juan López Juárez',
  pastillas: [
    { 
      nombre: 'Omeoprazol',
      color: 'crimson',
      dosis: '10mg (2 pastillas)',
      periodo: 8,
      ultimaAplicacion: '2019-11-27T00:30'
    },
    {
      nombre: 'Acetiminofeno',
      color: 'dodgerblue',
      dosis: '300mg',
      periodo: 9,
      ultimaAplicacion: '2019-11-27T00:15' 
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
      fecha: '2019-11-27T17:00'
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
        <BottomNavigationAction label="Registro"    icon={<RegistroIcon />} component={LinkTo} to="/registro" />
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

const Inicio = ({ estado, despachar }) => {
  const classes = useListStyles();

  const [dialogoBorrarAbierto, setDialogoBorrarAbierto] = useState(false)
  const [entidadBorrar, setEntidadBorrar] = useState(null)

  const manejarCierreBorrar = completado => () => {
    setDialogoBorrarAbierto(false)

    if (entidadBorrar !== null && completado) {
      if (entidadBorrar && entidadBorrar.topico) {
        despachar({ type: 'DELETE_EVENT', consulta: entidadBorrar })
      } else {
        despachar({ type: 'DELETE_TRANS', transporte: entidadBorrar })
      }
    }
  }

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
                      <IconButton edge="end" aria-label="delete" onClick={() => despachar({ type: 'MARK_PILL_TAKEN', nombre: pastilla.nombre })}>
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
                <ListItem key={consulta.nombre + consulta.topico} button>
                  <ListItemAvatar>
                    <Avatar alt={consulta.nombre} src={`${consulta.nombre.split(' ').map(s => s.slice(0, 1)).join('').toLowerCase()}.jpeg`} />
                  </ListItemAvatar>
                  <ListItemText primary={`${consulta.topico} - ${consulta.nombre}`} secondary={consulta.mensaje} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => {
                      setEntidadBorrar(consulta)
                      setDialogoBorrarAbierto(true)
                    }}>
                      <Close />
                    </IconButton>
                  </ListItemSecondaryAction>
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
                    : actividad.nombre == 'Pintura' ? (<ColorLens />)
                    : (<MyLocation></MyLocation>)
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
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => {
                      setEntidadBorrar(transporte)
                      setDialogoBorrarAbierto(true)
                    }}>
                      <Close />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </div>
          )}
        </List>
        <Dialog
          open={dialogoBorrarAbierto}
          onClose={manejarCierreBorrar(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`¿Estás seguro que deseas cancelar ${entidadBorrar && entidadBorrar.topico ? 'la consulta' : 'el transporte'}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esta acción no se puede revertir.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={manejarCierreBorrar(false)} color="primary">
              Volver
            </Button>
            <Button onClick={manejarCierreBorrar(true)} color="primary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </InicioLayout>
  )
}

const useFabStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    'z-index': '10',
    bottom: theme.spacing(8),
    right: theme.spacing(2),
  }
}));

const useFormStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const Registro = ({ estado, fecha, despachar }) => {
  const classes = useListStyles()
  const fabStyles = useFabStyles()
  const formClasses = useFormStyles()
  
  const [pastillaABorrar, setPastillaABorrar] = useState('')
  const [actividadABorrar, setActividadABorrar] = useState(null)
  const [dialogoBorrarPastillaAbierto, setDialogoBorrarPastillaAbierto] = useState(false);
  const [dialogoAccionAbierto, setDialogoAccionAbierto] = useState(false)
  const [dialogoPastillaAbierto, setDialogoPastillaAbierto] = useState(false)
  const [dialogoTransporteAbierto, setDialogoTransporteAbierto] = useState(false)
  const [dialogoActividadAbierto, setDialogoActividadAbierto] = useState(false)
  const [dialogoConsultaAbierto, setDialogoConsultaAbierto] = useState(false)
  const [dialogoBorrarActividad, setDialogoBorrarActividad] = useState(false)

  const nuevaPastillaInicial = { nombre: '', dosis: '', periodo: 3, ultimaAplicacion: format(new Date(), "yyyy-MM-dd'T'HH:mm", { locale: es }) }
  const [nuevaPastilla, setNuevaPastilla] = useState(nuevaPastillaInicial)

  const nuevoTransporteInicial = { inicio: '', destino: '', vehiculo: '', fecha: format(new Date(), "yyyy-MM-dd'T'HH:mm", { locale: es }) }
  const [nuevoTransporte, setNuevoTransporte] = useState(nuevoTransporteInicial)

  const nuevaActividadInicial = { 
    nombre: '', 
    horas: [format(new Date(), "HH:mm", { locale: es }), format(addHours(new Date(), 1), "HH:mm", { locale: es })],
    dias: []
  }
  const [nuevaActividad, setNuevaActividad] = useState(nuevaActividadInicial)

  const nuevaConsultaInicial = { topico: '' , fecha: format(new Date(), "yyyy-MM-dd'T'HH:mm", { locale: es }) }
  const [doctorSeleccionado, setDoctorSeleccionado] = useState(null)
  const [nuevaConsulta, setNuevaConsulta] = useState(nuevaConsultaInicial)

  const manejarCierrePastilla = borrar => () => {
    setDialogoBorrarPastillaAbierto(false)
    if (borrar)
      despachar({ type: 'DELETE_PILL', nombre: pastillaABorrar })
  }

  const manejarCierreBorrarActividad = borrar => () => {
    setDialogoBorrarActividad(false)
    if (borrar)
      despachar({ type: 'DELETE_ACTIVITY', nombre: actividadABorrar })
  };

  const manejarCierreDialogoPastilla = completado => () => {
    setDialogoPastillaAbierto(false)

    if (completado) {
      if (nuevaPastilla.nombre.length > 0 && nuevaPastilla.dosis.length > 0)
        despachar({ type: 'ADD_PILL', pastilla: { ...nuevaPastilla, color: sample(['crimsom', 'tomato', '#BC54C7', '#75C754']) } })
    }
  }

  const manejarCierreDialogoTransporte = completado => () => {
    setDialogoTransporteAbierto(false)

    if (completado) {
      if (nuevoTransporte.inicio.length > 0 && nuevoTransporte.destino.length > 0 && nuevoTransporte.vehiculo.length > 0) 
        despachar({ type: 'ADD_TRANS', transporte: { ...nuevoTransporte } })
    }
  }

  const manejarCierreDialogoActividad = completado => () => {
    setDialogoActividadAbierto(false)

    if (completado) {
      if (nuevaActividad.nombre.length > 0 && new Date('2017-05-31T' + nuevaActividad.horas[0]) < new Date('2017-05-31T' + nuevaActividad.horas[1])) 
        despachar({ type: 'ADD_ACTIVITY', actividad: { ...nuevaActividad, dias: [...new Set(nuevaActividad.dias)] } })
    }
  }

  const manejarCierreDialogoConsulta = completado => () => {
    setDialogoConsultaAbierto(false)

    if (completado) {
      if (nuevaConsulta.topico.length > 0 && new Date() < new Date(nuevaConsulta.fecha)) 
        despachar({ type: 'ADD_EVENT', consulta: { ...nuevaConsulta, doctor: doctorSeleccionado } })
    }
  }

  const manejarCierreAccion = tipo => () => {
    setDialogoAccionAbierto(false)

    switch(tipo) {
      case 'Pastilla':
        setNuevaPastilla(nuevaPastillaInicial)
        setDialogoPastillaAbierto(true)
        break
      case 'Transporte':
        setNuevoTransporte(nuevoTransporteInicial)
        setDialogoTransporteAbierto(true)
        break
      case 'Actividad':
        setNuevaActividad(nuevaActividad)
        setDialogoActividadAbierto(true)
        break
    }
  }

  return (
  <InicioLayout>
    <InicioTop>
      <Typography style={{color: 'white'}} component="div">
        <Box style={{opacity: 0.6}}>Actividades</Box>
        <Box fontWeight="fontWeightMedium" fontSize="h6.fontSize">Juan López Juárez</Box>
      </Typography>
      <Avatar alt="Perfil" src={ImagenPerfil} style={{ width: 60, height: 60 }}/>
    </InicioTop>
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <List className={classes.root}>
        { estado.pastillas.length > 0 && (
              <div>
                <ListSubheader className={classes.root}>Todas las pastillas</ListSubheader>
                {estado.pastillas.map(pastilla => (
                  <ListItem key={pastilla.nombre} button>
                    <ListItemIcon>
                        <PildoraIcon style={{ color: pastilla.color }} />
                    </ListItemIcon>
                    <ListItemText primary={`${pastilla.nombre} ${pastilla.dosis}`} 
                                  secondary={`Cada ${pastilla.periodo} horas ${ new Date(pastilla.ultimaAplicacion) < fecha ? ` - Última toma ${formatDistance(new Date(pastilla.ultimaAplicacion), fecha, { addSuffix: true, locale: es })}`: ''  }`} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => { 
                        setPastillaABorrar(pastilla.nombre)
                        setDialogoBorrarPastillaAbierto(true);
                       }}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </div>
        )}
        { estado.doctores.length > 0 && (
            <div>
              <ListSubheader className={classes.root}>Todos los doctores</ListSubheader>
              {estado.doctores.map(doctor => (
                <ListItem key={doctor.nombre} button>
                  <ListItemAvatar>
                    <Avatar alt={doctor.nombre} src={`${doctor.nombre.split(' ').map(s => s.slice(0, 1)).join('').toLowerCase()}.jpeg`} />
                  </ListItemAvatar>
                  <ListItemText primary={`${doctor.nombre}`} secondary={`${doctor.especialidad}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="add" onClick={() => {
                      setNuevaConsulta(nuevaConsultaInicial)
                      setDoctorSeleccionado(doctor)
                      setDialogoConsultaAbierto(true)
                    }}>
                      <Add />
                    </IconButton>
                  </ListItemSecondaryAction>
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
                  : actividad.nombre == 'Pintura' ? (<ColorLens />)
                  : (<MyLocation></MyLocation>)
                  }
                </ListItemIcon>
                <ListItemText primary={actividad.nombre} 
                              secondary={`${["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].filter((_, i) => actividad.dias.indexOf(i) !== -1).join(', ')} de ${actividad.horas[0]} a ${actividad.horas[1]}`} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="delete" onClick={() => { 
                    setActividadABorrar(actividad.nombre)
                    setDialogoBorrarActividad(true);
                    }}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </div>
        )}
        <div style={{ height: '64px' }}></div>
      </List>
      <Fab aria-label="Agregar" className={fabStyles.fab} color="primary" onClick={() => {
        setDialogoAccionAbierto(true)
      }} >
        <Add />
      </Fab>

       <Dialog open={dialogoPastillaAbierto} onClose={manejarCierreDialogoPastilla(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar pastilla</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Información sobre el medicamento
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre"
            type="text"
            fullWidth
            value={nuevaPastilla.nombre}
            onChange={e => setNuevaPastilla({ ...nuevaPastilla, nombre: e.target.value })}
          />
          <TextField
            margin="dense"
            id="dosis"
            label="Dosis"
            type="text"
            fullWidth
            value={nuevaPastilla.dosis}
            onChange={e => setNuevaPastilla({ ...nuevaPastilla, dosis: e.target.value })}
          />
          <Typography id="discrete-slider" gutterBottom>
            Frecuencia (horas)
          </Typography>
          <Slider
            defaultValue={8}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={12}
            value={nuevaPastilla.periodo}
            onChange={(e, val) => setNuevaPastilla({ ...nuevaPastilla, periodo: val })}
          />
          <TextField
            id="date"
            margin="dense"
            label="Fecha"
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            defaultValue={nuevaPastilla.ultimaAplicacion}
            onChange={e => setNuevaPastilla({ ...nuevaPastilla, ultimaAplicacion: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={manejarCierreDialogoPastilla(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={manejarCierreDialogoPastilla(true)} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogoTransporteAbierto} onClose={manejarCierreDialogoTransporte(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar Transporte</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Información sobre el transporte
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Inicio"
            type="text"
            fullWidth
            value={nuevoTransporte.inicio}
            onChange={e => setNuevoTransporte({ ...nuevoTransporte, inicio: e.target.value })}
          />
          <TextField
            margin="dense"
            id="nombre"
            label="Destino"
            type="text"
            fullWidth
            value={nuevoTransporte.destino}
            onChange={e => setNuevoTransporte({ ...nuevoTransporte, destino: e.target.value })}
          />
          <TextField
            margin="dense"
            id="nombre"
            label="Vehículo"
            type="text"
            fullWidth
            value={nuevoTransporte.vehiculo}
            onChange={e => setNuevoTransporte({ ...nuevoTransporte, vehiculo: e.target.value })}
          />
          <TextField
            id="date"
            margin="dense"
            label="Fecha"
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            defaultValue={nuevoTransporte.fecha}
            onChange={e => setNuevoTransporte({ ...nuevoTransporte, fecha: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={manejarCierreDialogoTransporte(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={manejarCierreDialogoTransporte(true)} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogoActividadAbierto} onClose={manejarCierreDialogoActividad(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar Actividad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Información sobre la actividad
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre"
            type="text"
            fullWidth
            value={nuevaActividad.nombre}
            onChange={e => setNuevaActividad({ ...nuevaActividad, nombre: e.target.value })}
          />
          <TextField
            id="date"
            margin="dense"
            label="Inicio"
            type="time"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            defaultValue={nuevaActividad.horas[0]}
            onChange={e => setNuevaActividad({ ...nuevaActividad, horas: [e.target.value, nuevaActividad.horas[1]] })}
          />
          <TextField
            id="date"
            margin="dense"
            label="Fin"
            type="time"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            defaultValue={nuevaActividad.horas[1]}
            onChange={e => setNuevaActividad({ ...nuevaActividad, horas: [nuevaActividad.horas[0], nuevaActividad.horas[1]] })}
          />
          <FormControl component="fieldset" className={formClasses.formControl}>
            <FormLabel component="legend">Días</FormLabel>
            <FormGroup>
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((d, i) => (
                <FormControlLabel key={d}
                  control={<Checkbox checked={nuevaActividad.dias.indexOf(i + 1) !== -1} onChange={e => {
                    if (e.target.checked)
                      setNuevaActividad({ ...nuevaActividad, dias: union(nuevaActividad.dias, [i + 1]) })
                    else
                      setNuevaActividad({ ...nuevaActividad, dias: difference(nuevaActividad.dias, [i + 1]) })
                  }} value={false} />}
                  label={d}
                />                
              ))}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={manejarCierreDialogoActividad(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={manejarCierreDialogoActividad(true)} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog onClose={manejarCierreAccion(null)} aria-labelledby="simple-dialog-title" open={dialogoAccionAbierto}
              fullWidth>
        <DialogTitle id="simple-dialog-title">Agregar...</DialogTitle>
        <List>
          {['Pastilla', 'Actividad', 'Transporte'].map(a => (
            <ListItem key={a} autoFocus button onClick={manejarCierreAccion(a)}>
              <ListItemIcon>
                { a == 'Pastilla' ? <PildoraIcon />
                : a == 'Actividad' ? <ColorLens />
                : a == 'Transporte' && <DirectionsBus />
                }
              </ListItemIcon>
              <ListItemText primary={a} />
            </ListItem>
          ))}
        </List>
      </Dialog>


      <Dialog open={dialogoConsultaAbierto} onClose={manejarCierreDialogoConsulta(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar Consulta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Consulta con {doctorSeleccionado && doctorSeleccionado.nombre}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Tópico"
            type="text"
            fullWidth
            value={nuevaConsulta.topico}
            onChange={e => setNuevaConsulta({ ...nuevaConsulta, topico: e.target.value })}
          />
          <TextField
            id="date"
            margin="dense"
            label="Fecha"
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            defaultValue={nuevaConsulta.fecha}
            onChange={e => setNuevaConsulta({ ...nuevaConsulta, fecha: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={manejarCierreDialogoConsulta(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={manejarCierreDialogoConsulta(true)} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogoBorrarPastillaAbierto}
        onClose={manejarCierrePastilla(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estás seguro que deseas borrar la pastilla?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esto borrará todos los registros de esta pastilla.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={manejarCierrePastilla(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={manejarCierrePastilla(true)} color="primary" autoFocus>
            Borrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogoBorrarActividad}
        onClose={manejarCierreBorrarActividad(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`¿Estás seguro que deseas borrar la actividad ${actividadABorrar}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esto borrará todos los registros de esta actividad.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={manejarCierreBorrarActividad(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={manejarCierreBorrarActividad(true)} color="primary" autoFocus>
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  </InicioLayout>)
}


const InformacionLayout = styled.div``

const Informacion = () => {
  return (
  <InformacionLayout>

  </InformacionLayout>)
}

const App = () => {
  
  const estadoInicial = JSON.parse(localStorage.getItem('estado')) || datos

  const [{ estado, fecha }, despachar] = useReducer(reducirEstado, {
    estado: estadoInicial, 
    fecha: Date.now() 
  })

  useEffect(() => {
    if (estado !== undefined)
      localStorage.setItem('estado', JSON.stringify(estado))
  }, [estado])

  return (
    <BrowserRouter>
      <AppMainLayout>
        <Switch>
          <Route exact path="/"      render={() => <Inicio estado={determinarEventosHoy(estado, fecha)} despachar={despachar}></Inicio>} />
          <Route path="/registro"    component={() => <Registro {...{ estado, fecha, despachar }}></Registro>} />
          <Route path="/informacion" component={Informacion} />
        </Switch>
        <BottomNavBar />
      </AppMainLayout>
    </BrowserRouter>
  )
}

render(<App />, document.getElementById('app'))

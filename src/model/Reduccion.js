import { lensPath, set } from 'ramda'
import { subMinutes, format } from 'date-fns'
import over from 'ramda/es/over'

const _fecha = lensPath(['fecha'])
const _pastillas = lensPath(['estado', 'pastillas'])
const _transportes = lensPath(['estado', 'transportes'])
const _actividades = lensPath(['estado', 'actividades'])

export function reducirEstado(anteriorEstado, accion) {
  const estado = set(_fecha, new Date(), anteriorEstado)

  switch (accion.type) {
    case 'MARK_PILL_TAKEN': {
      const indice = estado.estado.pastillas.findIndex(p => p.nombre === accion.nombre)

      if (indice !== -1) {
        const _ultimaAplicacion = lensPath(['estado', 'pastillas', indice, 'ultimaAplicacion'])

        return set(_ultimaAplicacion, JSON.stringify(subMinutes(new Date(), 1)).slice(1, -1), estado) 
      }
    }
    case 'DELETE_PILL': {
      return over(_pastillas, p => p.filter(p => p.nombre !== accion.nombre), estado)
    }
    case 'ADD_PILL': 
      return over(_pastillas, p => [...p, accion.pastilla], estado)
    case 'ADD_TRANS': 
      return over(_transportes, t => [...t, accion.transporte], estado)
    case 'ADD_ACTIVITY':
      return over(_actividades, a => [...a, accion.actividad], estado)
    case 'DELETE_TRANS': {
      const indiceTransporte = estado.estado.transportes.findIndex(t => t.fecha === accion.transporte.fecha)
      return over(_transportes, t => t.filter((_, i) => i !== indiceTransporte), estado)
    }
    case 'DELETE_ACTIVITY': {
      return over(_actividades, a => a.filter(ac => ac.nombre !== accion.nombre), estado)
    }
    case 'ADD_EVENT': {
      const indiceDoctor = estado.estado.doctores.findIndex(d => d.nombre === accion.consulta.doctor.nombre)
      const _consultas = lensPath(['estado', 'doctores', indiceDoctor, 'consultas'])

      return over(_consultas, c => [...c, { topico: accion.consulta.topico, fecha: accion.consulta.fecha }], estado)
    }
    case 'DELETE_EVENT': {
      const indiceDoctor = estado.estado.doctores.findIndex(d => d.nombre === accion.consulta.nombre)
      const indice = estado.estado.doctores[indiceDoctor].consultas.findIndex(c => c.fecha === format(accion.consulta.fecha, "yyyy-MM-dd'T'HH:mm"))

      const _consultas = lensPath(['estado', 'doctores', indiceDoctor, 'consultas'])

      return over(_consultas, c => c.filter((_, i) => i !== indice), estado)
    }
  }

  return estado
}
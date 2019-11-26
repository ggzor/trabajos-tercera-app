import { lensPath, set } from 'ramda'
import { subMinutes } from 'date-fns'
import view from 'ramda/es/view'
import over from 'ramda/es/over'
import remove from 'ramda/es/remove'

const _fecha = lensPath(['fecha'])
const _pastillas = lensPath(['estado', 'pastillas'])

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
    case 'BLOCK_REFRESH':
      return { ...estado, puedeRefrescar: false }
    case 'ALLOW_REFRESH':
      return { ...estado, puedeRefrescar: true }
  }

  return estado
}
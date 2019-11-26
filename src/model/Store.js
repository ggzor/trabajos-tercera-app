import { addHours, differenceInHours, differenceInDays, formatDistance, format } from 'date-fns'
import { es } from 'date-fns/locale'
import { capitalize, sortBy } from 'lodash'

const obtenerEventoPastilla = (pastilla, fecha) => {
  const ultimaAplicacion = new Date(pastilla.ultimaAplicacion)

  const siguienteAplicacion = fecha < ultimaAplicacion ? ultimaAplicacion : addHours(ultimaAplicacion, pastilla.periodo)
  
  const relevante = (fecha < siguienteAplicacion && differenceInHours(siguienteAplicacion, fecha) < 2) ||
                    (siguienteAplicacion < fecha) ||
                    (fecha < ultimaAplicacion)

  if (relevante)
    return {
      ...pastilla,
      mensaje: format(siguienteAplicacion, 'kk:mm bbbb', { locale: es }) + ' - ' + (fecha < siguienteAplicacion 
                 ? 'En ' + formatDistance(siguienteAplicacion, fecha, { locale: es })
                 : 'Con retraso'),
      siguiente: siguienteAplicacion
    }
}

const obtenerConsulta = (doctor, fecha) => {
  return doctor.consultas
           .map(c => ({ ...c, fecha: new Date(c.fecha) }))
           .filter(({ fecha: f }) => fecha < f)
           .map(({ fecha: f, topico }) => ({ 
             ...doctor, 
             topico,
             fecha: f,
             mensaje: capitalize(format(f, 'EEEE', { locale: es })) + ' a las ' + format(f, 'kk:mm bbbb', {locale: es})
           }))
}

const obtenerActividades = (actividad, fecha) => {
  const dow = Number(format(fecha, 'i'))

  if (actividad.dias.indexOf(dow) != -1)
    return {
      ...actividad,
      mensaje: `${actividad.horas[0]} - ${actividad.horas[1]}`
    }
}

const obtenerTransportes = (transporte, fecha) => {
  const fechaTransporte = new Date(transporte.fecha)
  const relevante = (fecha < fechaTransporte && differenceInDays(fechaTransporte, fecha) <= 2) ||
                    (fechaTransporte < fecha && differenceInHours(fecha, fechaTransporte) <= 4)

  if (relevante) {
    return {
      ...transporte,
      mensaje: capitalize(formatDistance(fechaTransporte, fecha, { addSuffix: true, locale: es }))
    }
  }
}

export const determinarEventosHoy = (datos, fecha) => ({
  pastillas: sortBy(datos.pastillas
               .map(p => obtenerEventoPastilla(p, fecha))
               .filter(p => p !== undefined), 'siguiente'),
  consultas: sortBy(datos.doctores
               .flatMap(d => obtenerConsulta(d, fecha))
               .filter(c => c !== undefined), 'fecha'),
  actividades: datos.actividades
                 .map(a => obtenerActividades(a, fecha))
                 .filter(a => a !== undefined),
  transportes: datos.transportes
                 .map(t => obtenerTransportes(t, fecha))
                 .filter(t => t !== undefined)
})

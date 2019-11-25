const { addHours, differenceInHours, formatDistance } = require('date-fns')
const { es } = require('date-fns/locale')

const datos = {
  paciente: 'Juan López Juárez',
  pastillas: [
    { 
      nombre: 'Omeoprazol',
      color: 'red',
      dosis: '10mg (2 pastillas)',
      periodo: 8,
      ultimaAplicacion: '2019-11-25T00:30'
    },
    {
      nombre: 'Acetiminofeno',
      color: 'blue',
      dosis: '300mg',
      periodo: 9,
      ultimaAplicacion: '2019-11-25T00:15' 
    }
  ],
  doctores: [
    {
      nombre: 'Juan Carlos Baez',
      especialidad: 'Geriatra',
      consultas: ['2019-11-27']
    },
    {
      nombre: 'María de la Luz Jimenez',
      especialidad: 'Fisioterapeuta',
      consultas: ['2019-12-29']
    }
  ],
  actividades: [
    { 
      nombre: 'Natación', 
      horas: ['08:30', '09:30'], 
      dias: ['L', 'Mie', 'V'] 
    },
    { 
      nombre: 'Pintura', 
      horas: ['08:30', '09:30'], 
      dias: ['L', 'Mie', 'V'] 
    },
    { 
      nombre: 'Yoga', 
      horas: ['08:30', '09:30'], 
      dias: ['L', 'Mie', 'V'] 
    }
  ],
  transporte: [
    { 
      inicio: 'Priv. Ingeniería Química #1809', 
      destino: 'Hospital Puebla',
      vehiculo: 'Versa Blanco'
    }
  ]
}

const obtenerEventoPastilla = (pastilla, fecha) => {
  const ultimaAplicacion = new Date(pastilla.ultimaAplicacion)
  const siguienteAplicacion = addHours(ultimaAplicacion, pastilla.periodo)
  
  const relevante = (fecha < siguienteAplicacion && differenceInHours(siguienteAplicacion, fecha) < 2) ||
                    (siguienteAplicacion < fecha)

  if (relevante)
    return {
      ...pastilla,
      mensaje: fecha < siguienteAplicacion 
                 ? 'En ' + formatDistance(siguienteAplicacion, fecha, { locale: es })
                 : 'Con retraso'
    }
}

const obtenerConsulta = (doctor, fecha) => {

}

const obtenerActividades = (actividad, fecha) => {

}

const obtenerTransportes = (transporte, fecha) => {
  
}

const determinarEventosHoy = (datos, fecha) => ({
  pastillas: datos.pastillas
               .map(p => obtenerEventoPastilla(p, fecha))
               .filter(p => p !== undefined),
  consultas: datos.consultas
               .flatMap(d => obtenerConsulta(d, fecha))
               .filter(c => c !== undefined),
  actividades: datos.actividades
                 .map(a => obtenerActividades(a, fecha))
                 .filter(a => a !== undefined),
  transportes: datos.transportes
                 .map(t => obtenerTransportes(t, fecha))
                 .filter(t => t !== undefined)
})

console.log(determinarEventosHoy(datos, new Date('2019-11-25T08:00')))
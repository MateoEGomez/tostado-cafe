import { marca } from '~/config/marca'
import type { LineaCarrito } from '~/composables/useCarrito'

const pesos = (n: number) => '$' + n.toLocaleString('es-AR')

export const linkWhatsapp = (texto: string) => {
  const numero = useRuntimeConfig().public.whatsapp
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
}

export interface DatosCliente {
  nombre: string
  telefono: string
  entrega: 'retiro' | 'envio'
  direccion?: string
  nota?: string
}

const COSTO_ENVIO = 2500

export function mensajePedido(lineas: LineaCarrito[], cliente: DatosCliente) {
  const subtotal = lineas.reduce((s, l) => s + l.precio * l.cantidad, 0)
  const envio = cliente.entrega === 'envio' ? COSTO_ENVIO : 0

  const detalle = lineas
    .map((l) => `• ${l.cantidad}× ${l.nombre} — ${pesos(l.precio * l.cantidad)}`)
    .join('\n')

  const partes = [
    `Hola ${marca.nombre}, quiero hacer este pedido:`,
    '',
    detalle,
    '',
    `Subtotal: ${pesos(subtotal)}`,
    envio ? `Envío: ${pesos(envio)}` : 'Retiro en el local',
    `Total: ${pesos(subtotal + envio)}`,
    '',
    `Nombre: ${cliente.nombre}`,
    `Teléfono: ${cliente.telefono}`,
    `Entrega: ${cliente.entrega === 'envio' ? 'Envío a domicilio' : 'Retiro en el local'}`
  ]
  if (cliente.entrega === 'envio' && cliente.direccion) partes.push(`Dirección: ${cliente.direccion}`)
  if (cliente.nota) partes.push(`Nota: ${cliente.nota}`)

  return { texto: partes.join('\n'), subtotal, envio, total: subtotal + envio }
}

export function mensajeConsulta(nombre: string, mensaje: string) {
  return [`Hola ${marca.nombre}, soy ${nombre}.`, '', mensaje].join('\n')
}

export interface Toast {
  id: number
  texto: string
  tipo: 'ok' | 'error'
}

let seq = 0

export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => [])

  const mostrar = (texto: string, tipo: Toast['tipo'] = 'ok') => {
    const id = ++seq
    toasts.value = [...toasts.value, { id, texto, tipo }]
    if (import.meta.client) {
      setTimeout(() => {
        toasts.value = toasts.value.filter((t) => t.id !== id)
      }, 3200)
    }
  }

  return {
    toasts,
    ok: (t: string) => mostrar(t, 'ok'),
    error: (t: string) => mostrar(t, 'error')
  }
}

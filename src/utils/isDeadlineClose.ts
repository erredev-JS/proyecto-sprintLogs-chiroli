import { ITareas } from "../types/ITareas"

export const isDeadlineClose = (tarea: ITareas) => {
    const hoy = new Date()
    const fechaLimite = new Date(tarea.fechaLimite)
    const diffTime = fechaLimite.getTime() - hoy.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    return diffDays < 3 && diffDays >= 0
  }
import { ITareas } from "../types/ITareas"

export const isDeadlinePassed = (tarea: ITareas) => {
    const hoy = new Date()
    const fechaLimite = new Date(tarea.fechaLimite)
    return fechaLimite.getTime() < hoy.getTime()
  }
import { DateTime } from 'luxon';

const ARG_TIMEZONE = 'America/Argentina/Buenos_Aires';

/**
 * Obtiene la fecha y hora actual en la zona horaria de Argentina.
 * @returns {string} Fecha y hora en formato 'yyyy-MM-dd HH:mm'
 */
export function getCurrentTimeInArgentina(): string {
    return DateTime.now().setZone(ARG_TIMEZONE).toFormat('yyyy-MM-dd HH:mm');
}

/**
 * Convierte una fecha dada a la zona horaria de Argentina.
 * @param {string} date Fecha en formato ISO (ejemplo: '2024-02-11T12:00:00Z')
 * @returns {string} Fecha convertida en formato 'yyyy-MM-dd HH:mm'
 */
export function convertToArgentinaTime(date: string): string {
    return DateTime.fromISO(date, { zone: 'utc' })
        .setZone(ARG_TIMEZONE)
        .toFormat('yyyy-MM-dd HH:mm');
}

/**
 * Suma días, horas o minutos a la hora actual en Argentina.
 * @param {number} days Número de días a sumar (opcional)
 * @param {number} hours Número de horas a sumar (opcional)
 * @param {number} minutes Número de minutos a sumar (opcional)
 * @returns {string} Nueva fecha y hora en Argentina en formato 'yyyy-MM-dd HH:mm'
 */
export function addTimeInArgentina(days: number = 0, hours: number = 0, minutes: number = 0): string {
    return DateTime.now()
        .setZone(ARG_TIMEZONE)
        .plus({ days, hours, minutes })
        .toFormat('yyyy-MM-dd HH:mm');
}

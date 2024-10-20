/*export function logger(req, res, next) {
  console.log(`🚀 ~ logger ~ req:`, req.url);
  next();
}*/
import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  level: 'info', // Configura el nivel mínimo para registrar
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // Incluir la pila de errores
    format.json() // Usar formato JSON para facilidad de análisis
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(), // Colorea el output en la consola
        format.printf(({ timestamp, level, message, stack }) => {
          return stack
            ? `${timestamp} [${level}]: ${message}\nStack: ${stack}`
            : `${timestamp} [${level}]: ${message}`;
        })
      )
    }),
    new transports.File({ filename: 'error.log', level: 'error' }), // Guardar errores en un archivo
    new transports.File({ filename: 'combined.log' }) // Guardar todos los logs en un archivo combinado
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' }) // Guardar excepciones no controladas en un archivo separado
  ]
});

// En producción, desactivar el registro detallado en consola
if (process.env.NODE_ENV === 'production') {
  logger.transports.forEach((t) => {
    if (t instanceof transports.Console) {
      t.silent = true;
    }
  });
}

export default logger;


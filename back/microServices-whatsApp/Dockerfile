# Usar una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala todas las dependencias (incluye las de desarrollo)
RUN npm install --legacy-peer-deps

# Copia el resto del código
COPY . .

# Copia el archivo .env al contenedor
COPY .env .env

# Compila TypeScript a JavaScript
RUN npx tsc

# Expone el puerto
EXPOSE 3003

# Ejecuta el comando de inicio de la aplicación
CMD ["npm", "start"]

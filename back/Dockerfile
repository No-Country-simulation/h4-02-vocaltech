# Usar una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala todas las dependencias (incluye las de desarrollo)
RUN npm install --legacy-peer-deps

# Copia todo el código fuente
COPY src ./src

# Copia el resto del código
COPY . .

# Compila TypeScript a JavaScript
# RUN npx tsc
# Libera memoria antes de correr npx tsc
RUN NODE_OPTIONS="--max-old-space-size=2048" npx tsc

# Expone el puerto
EXPOSE 3000

# Ejecuta el comando de inicio de la aplicación
CMD ["npm", "start"]

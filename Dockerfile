# Establece la imagen base
FROM node:alpine AS builder

# Establece el directorio de trabajo en la imagen
WORKDIR /app

# Copia el archivo package.json al directorio de trabajo
COPY package.json .

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Compila la aplicación de React
RUN npm run build

# Establece la imagen base para servir la aplicación
FROM nginx:alpine

# Copia los archivos compilados de la aplicación de React al directorio de trabajo de Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expone el puerto 80 para que la aplicación sea accesible desde el exterior
EXPOSE 80

# Comando para iniciar el servidor de Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]

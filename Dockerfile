FROM node:18

# Create app directory
WORKDIR /app

# Copiar los archivos de la aplicación al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar los archivos de la aplicación al contenedor
COPY . .

RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "npm", "run", "start:prod" ]
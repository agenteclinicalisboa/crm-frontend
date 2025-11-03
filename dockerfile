# Etapa 1: Build (TypeScript)
FROM node:22.13.1 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila TypeScript
RUN npm run build

# Etapa 2: Produção
FROM nginx:stable-alpine

# Copia o código compilado da etapa de build
COPY --from=build /app/dist /usr/share/nginx/html

# Expondo a porta que o React usa
EXPOSE 80

# Comando padrão para iniciar a aplicação
CMD ["nginx", "-g", "daemon off;"]

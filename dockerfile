# Usa a imagem Node.js Alpine como base
FROM node:alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia todos os arquivos do diretório atual para o diretório de trabalho no contêiner
COPY . .

# Executa o comando npm install para instalar as dependências
RUN npm install

RUN npm run build



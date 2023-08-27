# Utilize a imagem oficial do Node.js como base
FROM node:lts

# Diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de pacote
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Gere os arquivos do Prisma
RUN npx prisma generate

# Exponha a porta padrão do NestJS (ajuste se for diferente)
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["./start.sh"]

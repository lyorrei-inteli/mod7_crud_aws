#!/bin/bash

# Roda a migração do Prisma
npx prisma migrate deploy

# Inicia a aplicação
npm run start:prod

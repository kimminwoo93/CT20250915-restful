# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY prisma ./prisma

COPY . .
RUN npm run build

# 소스 컴파일
RUN npx tsc prisma/seed.ts --outDir ./dist/prisma --target es2020 --module commonjs

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 시드 데이터 파일 복사
COPY --from=build /app/data/dummy_20230715.xlsx ./data/dummy_20230715.xlsx
COPY --from=build /app/dist/prisma/seed.js ./prisma/seed.js
# 실행 관련 파일 복사
COPY --from=build /app/prisma ./prisma 
COPY --from=build /app/dist ./dist

RUN npx prisma generate

EXPOSE 80

# CMD ["npm", "run", "start:prod"]
#####
# NPM CI PROD
#####
FROM node:18 as install-prod
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

#####
# NPM CI
#####
FROM install-prod as install
WORKDIR /usr/src/app

RUN npm ci

#####
# BUILD
#####
FROM install as build
WORKDIR /usr/src/app

COPY . .

RUN npm run build

#####
# PRODUCTION
#####

FROM node:18-alpine as production
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY . .
COPY --from=build /usr/src/app/.next ./.next
COPY --from=install-prod /usr/src/app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]

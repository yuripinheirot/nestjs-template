FROM node:23-alpine as api

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

RUN npx prisma generate

COPY . .

EXPOSE ${PORT:-3003}

CMD ["yarn", "dev"]

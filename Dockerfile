FROM node:23-alpine as api

COPY ./ /home/node/app

WORKDIR /home/node/app

RUN npx prisma generate

EXPOSE ${PORT:-3003}

CMD ["yarn", "dev"]

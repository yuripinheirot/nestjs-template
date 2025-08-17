FROM node:24-alpine AS development

WORKDIR /home/node/app

COPY package.json yarn.lock ./
COPY ./prisma ./prisma

RUN npm install -g prisma
RUN yarn install --frozen-lockfile
RUN npx prisma generate

COPY . .

EXPOSE ${PORT:-3003}

CMD ["yarn", "dev"]

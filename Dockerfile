FROM node:23-alpine as api

WORKDIR /home/node/app

# Copy package files first for better layer caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

EXPOSE ${PORT:-3003}

CMD ["yarn", "dev"]

FROM node:18 as builder

COPY server/ /app/server
WORKDIR /app/server
#RUN ls -al
RUN yarn install

# Lint
RUN yarn lint

# Test
RUN yarn coverage

# Build
RUN yarn build

FROM node:18

WORKDIR /app

COPY --from=builder app/server/package.json /app
COPY --from=builder app/server/build /app/build

RUN yarn install --production

RUN ls -al

CMD node build/index.js
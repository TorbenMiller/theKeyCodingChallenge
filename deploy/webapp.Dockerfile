FROM node:18 AS builder

COPY webapp/ /app/webapp
WORKDIR /app/webapp

# Build for tests
RUN yarn install

# Lint
RUN yarn lint

# Test
RUN yarn coverage

# Build
RUN yarn build

FROM nginx

COPY --from=builder app/webapp/dist /usr/share/nginx/html
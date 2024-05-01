# syntax = docker/dockerfile:experimental
FROM --platform=${BUILDPLATFORM:-linux/amd64,linux/arm64} node:18-buster AS builder

WORKDIR /app
COPY . .

RUN npm install && npm run build

FROM --platform=${BUILDPLATFORM:-linux/amd64,linux/arm64} ghcr.io/rookie-luochao/nginx-runner:latest

COPY --from=builder /app/dist .
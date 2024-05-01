# syntax = docker/dockerfile:experimental
FROM --platform=${BUILDPLATFORM:-linux/amd64,linux/arm64} node:18-buster AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . .

# RUN两次方便观察install和build, 也可以用pnpm cache and locked
RUN pnpm install && pnpm run build

FROM --platform=${BUILDPLATFORM:-linux/amd64,linux/arm64} ghcr.io/rookie-luochao/nginx-runner:latest

COPY --from=builder /app/dist .
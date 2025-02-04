
#=====================
# ---- Base Stage ----
#=====================
FROM node:20-alpine AS base
RUN apk update && apk add --no-cache \
    libc6-compat \
    python3 \
    py3-pip \
    make \
    g++ \
    gcc \
    openssl \
    openssl-dev

# ENV PNPM_HOME="/root/.local/share/pnpm"
# ENV PATH="${PATH}:${PNPM_HOME}"
# RUN corepack install -g pnpm@9.14.4
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.0.0 --activate
RUN pnpm add -g turbo
WORKDIR /app

# ==========================
# ---- Builder Stage ----
#===========================
FROM base AS builder
COPY . .
RUN turbo prune --scope=api --docker

#===========================
# ---- Installer Stage ----
#===========================
FROM base AS installer
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm install 
RUN pnpm migrate
# Build the project and its dependencies
RUN pnpm turbo build --filter=api

#===========================
# ---- Runner Stage ----
#===========================

FROM base AS runner

COPY --from=installer /app .
EXPOSE 1337

# CMD [ "pnpm","migrate" ]

CMD [ "node", "apps/api/dist/index.js" ]

# FROM base AS production

# COPY apps/api/package.json ./apps/api/package.json

# RUN pnpm install --frozen-lockfile --prod

# COPY . .

# RUN pnpm build


# CMD [ "node", "./dist/index.js" ]


#============================
# ---- Development Stage ----
#============================
# FROM builder AS development

# COPY apps/api/package.json ./apps/api/package.json

# RUN pnpm install --frozen-lockfile

# COPY . .

# CMD [ "pnpm", "dev" ]
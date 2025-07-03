# ──────────────── Stage 1: Build ────────────────
FROM node:18-alpine AS build

# 1. Create & set app dir
WORKDIR /usr/src/app

# 2. Install deps (only package files)
COPY app/package.json app/package-lock.json ./
RUN npm ci

# 3. Copy source & run your Webpack build
COPY app/ ./
RUN npm run build
# this produces /usr/src/app/dist

# ──────────────── Stage 2: Serve ────────────────
FROM nginx:stable-alpine

# 4. Drop in custom NGINX config (for SPA routing)
COPY nginx.default.conf /etc/nginx/conf.d/default.conf

# 5. Copy built files from the build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# 6. Expose & launch
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]


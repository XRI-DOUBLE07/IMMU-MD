FROM node:lts-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ffmpeg \
        git \
        ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN git clone https://github.com/XRI-DOUBLE07/IMMU-MD.git /app && \
    chown -R node:node /app

USER node

RUN yarn install --frozen-lockfile --network-concurrency 1

EXPOSE 7860

ENV NODE_ENV=production

CMD ["node", "index.js"]

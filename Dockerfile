# Use slim variant for smaller size & faster build
FROM node:lts-slim

# Install only what we actually need + clean up in same layer to keep image small
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ffmpeg \
        git \
        ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Create app directory and set proper permissions
WORKDIR /app

# Clone repo (replace with your actual repo)
RUN git clone https://github.com/KAMRAN-SMD/DJ /app && \
    chown -R node:node /app

# Switch to non-root user for security
USER node

# Install dependencies (yarn is faster & more reliable than npm in Docker)
RUN yarn install --frozen-lockfile --network-concurrency 1

# Expose port if needed (some platforms ignore this, but good practice)
EXPOSE 7860

# Production mode + proper startup
ENV NODE_ENV=production

# Use node directly instead of npm start (faster & avoids extra shell)
CMD ["node", "index.js"]

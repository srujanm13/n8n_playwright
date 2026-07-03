FROM mcr.microsoft.com/playwright:v1.51.1-jammy

USER root
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NPM_GLOBAL=/home/node/.npm-global
ENV PATH=$NPM_GLOBAL/bin:$PATH
RUN mkdir -p "$NPM_GLOBAL" \
    && npm config set prefix "$NPM_GLOBAL" \
    && npm install -g playwright

# Pre-install the specialized browser engines and dependencies 
RUN npx playwright install chrome --with-deps

# Expose network port for the SSE endpoint
EXPOSE 8931

# Run the Playwright MCP server with appropriate cloud execution flags
ENTRYPOINT ["bash","-lc"]
# Ensure the host flag is explicitly set to 0.0.0.0
CMD ["npx @playwright/mcp@latest --host 0.0.0.0 --port 8931 --isolated --no-sandbox --ignore-https-errors --headless"]


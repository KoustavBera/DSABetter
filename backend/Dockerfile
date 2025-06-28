FROM node:22-slim

# Update and install security patches
RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app


COPY package*.json ./

RUN npm install 


COPY . .

ENV PORT=8000

EXPOSE 8000


CMD ["npm", "start"]
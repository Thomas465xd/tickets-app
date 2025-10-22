FROM node:alpine

WORKDIR /app

COPY package*.json tsconfig.json ./

# Add --omit=dev after npm install for production build
RUN npm install

COPY ./ ./

# This command should change in production build "npm run build"
CMD [ "npm", "run", "dev" ]
FROM node:alpine

WORKDIR /app

#copy source 
COPY . .

# Install deps 
RUN npm install 

# Build 
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]
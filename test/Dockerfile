
        FROM node:18
        WORKDIR /app
        
        EXPOSE 3000
        
        
        
        RUN git init
        RUN git pull https://github.com/jatins/express-hello-world
        
        RUN npm install --force
        RUN npm run build; exit 0
        
        CMD ["npm", "start"]
        
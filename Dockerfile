# Koristimo Node.js sliku kao osnovu
FROM node:18

# Postavi radni direktorijum unutar kontejnera
WORKDIR /app

# Kopiraj package.json i package-lock.json u kontejner
COPY package*.json ./

# Instaliraj dependencies
RUN npm install

# Kopiraj ceo Angular projekat u kontejner
COPY . .

# Izgradi Angular aplikaciju za produkciju
RUN npm run build --prod

# Instaliraj 'http-server' za posluživanje statičkih fajlova
RUN npm install -g http-server

# Definiši komandu za pokretanje aplikacije koristeći 'http-server'
CMD ["http-server", "dist/door2door-web", "-p", "8080", "-a", "0.0.0.0"]

# Expose port 8070 za pristup izvana
EXPOSE 8070
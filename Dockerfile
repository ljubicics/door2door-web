# 1. Korak: Koristi Node.js sliku kao osnovu za build korak
FROM node:18 AS build

# 2. Korak: Postavi radni direktorijum unutar kontejnera
WORKDIR /app

# 3. Korak: Kopiraj package.json i package-lock.json u kontejner
COPY package*.json ./

# 4. Korak: Instaliraj dependencies
RUN npm install

# 5. Korak: Kopiraj ceo Angular projekat u kontejner
COPY . .

# 6. Korak: Izgradi Angular aplikaciju za produkciju
RUN npm run build --prod

# 7. Korak: Koristi Nginx sliku kao osnovu za posluživanje aplikacije
FROM nginx:alpine

# 8. Korak: Kopiraj izgrađene datoteke iz prethodnog stepa u Nginx-ov direktorijum za posluživanje
COPY --from=build /app/dist/ime-aplikacije /usr/share/nginx/html

# 9. Korak: Expose port 80
EXPOSE 80

# 10. Korak: Startuj Nginx
CMD ["nginx", "-g", "daemon off;"]
FROM node:6.9.1

# Set the work directory
RUN mkdir -p /var/www/app/current
WORKDIR /var/www/app/current

ADD package.json ./

RUN npm install nodemon -g
RUN npm install

# Add application files
ADD ./dist /var/www/app/current/dist
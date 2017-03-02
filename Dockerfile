#
# Dockerfile for business-card-generator
#
FROM node:boron

RUN mkdir -p /home/app
WORKDIR /home/app
RUN mkdir -p public/temp

COPY . /home/app
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]

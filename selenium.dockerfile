FROM        node:latest
MAINTAINER  Rahul
COPY        . /var/www
WORKDIR     /var/www
RUN         npm install

FROM selenium/standalone-chrome
WORKDIR     /var/www
EXPOSE      4444
ENTRYPOINT  [ "npm", "run", "expo" ]
ENV EXEC_ENV=staging
ENV BACKUP_CODE=
ENV PROJECT_KEY=expo
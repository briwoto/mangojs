FROM node:latest

RUN apt-get -y update

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - 

# install google chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

# install chromedriver
RUN apt-get install -yqq unzip
RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip
RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/

# set display port to avoid crash
ENV DISPLAY=:99

WORKDIR /var/www

COPY . /var/www

RUN apt-get install -y default-jre && npm install && npm install chromedriver

EXPOSE      4444

ENTRYPOINT  [ "npm", "run", "demo" ]

ENV EXEC_ENV=prod
ENV BACKUP_CODE=
ENV PROJECT_KEY=demo
ENV RUN_HEADLESS=true
ENV ACCESS_TOKEN=
ENV BROWSER=
ENV TIMEOUT=15
FROM node:latest

# install google chrome
ENV CHROME_VERSION=80.0.3987.100
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - 

# RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

RUN apt-get -y update
RUN apt-get install -y google-chrome-stable=${CHROME_VERSION}-1

RUN google-chrome-stable --version

# install chromedriver
RUN apt-get install -yqq unzip
RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip
RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/

# set display port to avoid crash
ENV DISPLAY=:99

WORKDIR /var/www

COPY . /var/www

RUN apt-get install -y default-jre && npm install && npm install chromedriver && npm install chromedriver

EXPOSE      4444

ENTRYPOINT  [ "npm", "run", "demo" ]
# ENTRYPOINT  [ "npx", "cucumber-js", "features/expo/dashboard.feature" ]

ENV EXEC_ENV=prod
ENV BACKUP_CODE=
ENV PROJECT_KEY=demo
ENV RUN_HEADLESS=true

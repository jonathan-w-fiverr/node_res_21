FROM node:10-alpine
WORKDIR /usr/src/app
RUN apk add --update --no-cache openssh-client git \
 && mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
 RUN apk add poppler-utils
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN echo "$PATH"
RUN ls "/usr/local/bin"
CMD ["npm", "start"]
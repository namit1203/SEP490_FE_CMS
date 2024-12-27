FROM node:20.9.0
WORKDIR ./app
COPY . .
RUN yarn install
ENV HOST 0.0.0.0
EXPOSE 3002
CMD [ "yarn", "dev" ]

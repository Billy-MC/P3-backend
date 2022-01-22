FROM node:16-alpine as build

WORKDIR /devils-crm-backend

ENV NODE_ENV=uat
ENV DB_USER=devils
ENV DB_PASSWORD=devils
ENV DB_HOST=devils-crm.8y5vc.mongodb.net
ENV DE_HOST_UAT=devilscrm-uat.yqzp1.mongodb.net
ENV DB_DATABASE=myFirstDatabase?retryWrites=true&w=majority
ENV PORT=3000
ENV JWT_SECRET=KIMMINJUIZONEMAYAWAKISAKURAWIZONE
ENV JWT_EXPIRES_IN=1d
ENV PATH /devils-crm-backend/node_modules/.bin:$PATH
ENV SENDGRID_API_KEY=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
ENV SENDER_EMAIL=devilscrmpro@gmail.com

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --quiet

COPY . ./

RUN npm run build --quiet

EXPOSE 3000

CMD npm start


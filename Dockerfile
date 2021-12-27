FROM node:16-alpine as builder

RUN mkdir -p /usr/src/app/node_modules
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.* ./
RUN yarn global add typescript
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:alpine as runner
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Example of TypeScript / NodeJS sample architecture

This project is a example of the principles mentionned by @Lilobase in his [talk](https://www.youtube.com/watch?v=qBLtZN3p3FU) "CQRS, Fonctionnel, Event Sourcing & Domain Driven Design".

This is only the "domain" part of a project, without any depedency to any framework. Theses details of implementation could be added at the end. Even the choice of executing the business logic (frontend ? Backend ?) can be postponed thanks to JavaScript.

## getting started

```
yarn
yarn test
```

## Features

This is a fictive Doctolib-like app. Doctors add free slots, and authenticated users can book them.

A simple Command Bus dispatch the incoming command events to their handler. Each handler can return a list of domain events to trigger side effects, like Email notifications.

A few additionnal middlewares easily add some common features :

- authentication
- transaction boundary
- logger

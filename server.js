import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

import typeDefs from "./src/graphql/schema.js";
import resolvers from "./src/graphql/resolvers.js";
import db from "./src/models/index.js";

import faker from "faker";
import times from "lodash.times";
import random from "lodash.random";

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { db },
});

const app = express();
server.applyMiddleware({ app });

db.sequelize.sync().then(() => {
  // populate author table with dummy data
  db.author.bulkCreate(
    times(10, () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    }))
  );

  // populate post table with dummy data
  db.post.bulkCreate(
    times(10, () => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: random(1, 10),
    }))
  );

  app.listen({ port: 3001 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});

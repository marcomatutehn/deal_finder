import 'reflect-metadata';
import * as cors from 'cors';
import * as http from 'http';
import * as express from 'express';
import { resolvers } from "./resolvers";
import * as  bodyParser from 'body-parser';
import * as TypeGraphQL from 'type-graphql';
import { execute, subscribe } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws'

async function bootstrap() {

    // server setup
    const app = express();
    let server;

    // setting up middleware
    app.use(bodyParser.json());
    app.use(cors({}));

    // Generating GraphQL schema 
    const schema = await TypeGraphQL.buildSchema({
        resolvers,
        validate: false
    });

    // Creating Apollo Server based of schema
    const apollo = new ApolloServer({
        schema,
        playground: true
    });

    // Puts Apollo on the Server
    apollo.applyMiddleware({ app });

    // Builds server 
    server = http.createServer(app);
    server.listen(4000);

    // Add subscription support
    SubscriptionServer.create({ schema, execute, subscribe }, { server })
}

bootstrap()
    .then(_ => console.log('GraphQL service available on http://localhost:4000/graphql'))
    .catch(err => console.log(err))
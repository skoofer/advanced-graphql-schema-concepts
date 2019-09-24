const { ApolloServer } = require('apollo-server');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

const { makeRemoteExecutableSchema, introspectSchema } = require('graphql-tools');

const start = async () => {
  const link = new HttpLink({ uri: 'https://countries.trevorblades.com/', fetch });

  const remoteSchemaDefinition = await introspectSchema(link);

  const remoteExecutableSchema = makeRemoteExecutableSchema({ schema: remoteSchemaDefinition, link })

  const server = new ApolloServer({ schema: remoteExecutableSchema });

  server.listen(9005).then(({ url }) => {
    console.log(`5-remote-schema Server ready at ${url}`);
  });
}

start();
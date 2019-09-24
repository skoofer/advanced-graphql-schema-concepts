const { ApolloServer } = require('apollo-server');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

const {
    makeRemoteExecutableSchema,
    introspectSchema,
    transformSchema,
    FilterRootFields,
    RenameRootFields,
    FilterTypes,
    RenameTypes
} = require('graphql-tools');


const start = async () => {
    const link = new HttpLink({ uri: 'https://countries.trevorblades.com/', fetch });

    const remoteSchemaDefinition = await introspectSchema(link);

    const remoteExecutableSchema = makeRemoteExecutableSchema({ schema: remoteSchemaDefinition, link });

    const transforms = [
        // new FilterRootFields((_operation, fieldName) => ['country', 'countries'].includes(fieldName)),
        // new RenameRootFields((_operation, name) => `remote_${name}`),
        // new FilterTypes(type => !['Continent'].includes(type.name)),
        // new RenameTypes((name) => `Remote_${name}`)
    ];
    const transformedSchema = transformSchema(remoteExecutableSchema, transforms);

    const server = new ApolloServer({ schema: transformedSchema });

    server.listen(9006).then(({ url }) => {
        console.log(`6-schema-transforms Server ready at ${url}`);
    });
}

start();
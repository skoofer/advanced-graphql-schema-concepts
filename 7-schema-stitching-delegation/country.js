const {
    makeRemoteExecutableSchema,
    introspectSchema,
    transformSchema,
    FilterRootFields
} = require('graphql-tools');

const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

const getCountrySchema = async () => {
    const link = new HttpLink({ uri: 'https://countries.trevorblades.com/', fetch });

    const remoteSchemaDefinition = await introspectSchema(link);

    const remoteExecutableSchema = makeRemoteExecutableSchema({ schema: remoteSchemaDefinition, link });

    const transforms = [
        new FilterRootFields((_operation, fieldName) => ['country', 'countries'].includes(fieldName))
    ];
    const transformedSchema = transformSchema(remoteExecutableSchema, transforms);

    return transformedSchema;
}

module.exports = getCountrySchema;
const { introspectSchema } = require('graphql-tools');
const { printSchema } = require('graphql');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

const start = async () => {
    // https://github.com/graphql/graphql-js/blob/master/src/utilities/getIntrospectionQuery.js#L14

    const link = new HttpLink({ uri: 'https://countries.trevorblades.com/', fetch });

    const schema = await introspectSchema(link);

    const sdl = printSchema(schema);

    console.log(sdl);
};

start();
const { ApolloServer } = require('apollo-server');
const { mergeSchemas } = require('graphql-tools');
const employeeSchema = require('./employee');
const officeSchema = require('./office');

const schema = mergeSchemas({ schemas: [employeeSchema, officeSchema] });

const server = new ApolloServer({ schema });

server.listen(9002).then(({ url }) => {
    console.log(`2-schema-stitching-merging Server ready at ${url}`);
});
const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema, delegateToSchema } = require('graphql-tools');
const officeSchema = require('./office');

const employees = [
  {
    id: 'r.nistelrooy',
    name: 'Ruud van Nistelrooy',
    birthday: '1976-07-01',
    countryCode: 'NL',
    officeId: 1
  },
  {
    id: 't.henry',
    name: 'Thierry Henry',
    birthday: '1977-08-17',
    countryCode: 'FR',
    officeId: 3
  },
  {
    id: 'm.owen',
    name: 'Michael Owen',
    birthday: '1979-12-14',
    countryCode: 'GB',
    officeId: 2
  }
];

const typeDefs = `
  type Employee {
    name: String
    birthday: String
    countryCode: String
    office: Office
  }

  type Office {
    id: ID
    name: String
  }

  type Query {
    employee(id: ID): Employee
    employees: [Employee]
  }
`;

const resolvers = {
  Query: {
    employee: (_, args) => employees.find(employee => employee.id == args.id),
    employees: () => employees
  },
  Employee: {
    office: (parent, args, context, info) => {
      return delegateToSchema({
        schema: officeSchema,
        operation: 'query',
        fieldName: 'office',
        args: {
          id: parent.officeId,
        },
        context,
        info,
      });
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({ schema });

server.listen(9003).then(({ url }) => {
  console.log(`3-schema-delegation Server ready at ${url}`);
});
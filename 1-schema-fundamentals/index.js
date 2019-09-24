const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const employees = [
  {
    id: 'r.nistelrooy',
    name: 'Ruud van Nistelrooy',
    birthday: '1976-07-01',
    countryCode: 'NL'
  },
  {
    id: 't.henry',
    name: 'Thierry Henry',
    birthday: '1977-08-17',
    countryCode: 'FR'
  },
  {
    id: 'm.owen',
    name: 'Michael Owen',
    birthday: '1979-12-14',
    countryCode: 'GB'
  }
];

const typeDefs = `
  type Employee {
    id: ID
    name: String
    birthday: String
    countryCode: String
  }

  type Query {
    employee(id: ID): Employee
    employees: [Employee]
  }

  type Mutation {
    saveEmployee(id: ID! name: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    employee: (_, args) => employees.find(employee => employee.id == args.id),
    employees: () => employees
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({ schema });

server.listen(9001).then(({ url }) => {
  console.log(`1-schema-fundamentals Server ready at ${url}`);
});

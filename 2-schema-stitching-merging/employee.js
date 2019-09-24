const { makeExecutableSchema } = require('apollo-server');

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
`;

const resolvers = {
  Query: {
    employee: (_, args) => employees.find(employee => employee.id == args.id),
    employees: () => employees
  },
};

const employeeSchema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = employeeSchema;
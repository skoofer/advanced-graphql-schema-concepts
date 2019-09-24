const { makeExecutableSchema } = require('graphql-tools');

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
  },
  {
    id: 'r.makaay',
    name: 'Roy Makaay',
    birthday: '1975-03-09',
    countryCode: 'NL',
    officeId: 1
  }
];

const typeDefs = `
  type Employee {
    id: ID
    name: String
    birthday: String
    countryCode: String
    officeId: ID
  }

  type Query {
    employee(id: ID): Employee
    employees: [Employee]
    getEmployeesPerOffice(officeId: ID): [Employee]
  }
`;

const resolvers = {
  Query: {
    employee: (_, args) => employees.find(employee => employee.id == args.id),
    employees: () => employees,
    getEmployeesPerOffice: (_, args) => employees.filter(employee => employee.officeId == args.officeId)
  },
};

const employeeSchema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = employeeSchema;
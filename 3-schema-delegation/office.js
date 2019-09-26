const { makeExecutableSchema } = require('graphql-tools');

const offices = [
    {
        id: 1,
        name: 'Amsterdam Office',
        address: 'Graphqlstraat 1 1001XX Amsterdam'
    },
    {
        id: 2,
        name: 'London Office',
        address: '221b Baker St London NW1 6XE'
    },
    {
        id: 3,
        name: 'Paris Office',
        address: '1 Av. des Champs-Élysées 75008 Paris'
    }
];

const typeDefs = `
  type Office {
    id: ID
    name: String
    address: String
  }

  type Query {
    office(id: ID): Office
    offices: [Office]
  }
`;

const resolvers = {
    Query: {
        office: (_, args) => offices.find(office => office.id == args.id),
        offices: () => offices
    },
};

const officeSchema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = officeSchema;
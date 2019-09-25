const { mergeSchemas } = require('graphql-tools');
const { ApolloServer } = require('apollo-server');

const getCountrySchema = require('./country');

const start = async () => {
    const employeeSchema = require('./employee');
    const officeSchema = require('./office');
    const countrySchema = await getCountrySchema();


    const linkTypeDefs = `
    extend type Employee {
        country: Country
        office: Office
    }

    extend type Office {
        employees: [Employee]
    }
    `;

    const linkResolvers = {
        Employee: {
            country: {
                fragment: `... on Employee { countryCode }`,
                resolve(employee, _args, context, info) {
                    return info.mergeInfo.delegateToSchema({
                        schema: countrySchema,
                        operation: 'query',
                        fieldName: 'country',
                        args: {
                            code: employee.countryCode,
                        },
                        context,
                        info,
                    });
                },
            },
            office: {
                fragment: `... on Employee { officeId }`,
                resolve(employee, _args, context, info) {
                    return info.mergeInfo.delegateToSchema({
                        schema: officeSchema,
                        operation: 'query',
                        fieldName: 'office',
                        args: {
                            id: employee.officeId,
                        },
                        context,
                        info,
                    });
                },
            }
        },
        Office: {
            employees: {
                fragment: `... on Office { id }`,
                resolve(office, _args, context, info) {
                    return info.mergeInfo.delegateToSchema({
                        schema: employeeSchema,
                        operation: 'query',
                        fieldName: 'getEmployeesPerOffice',
                        args: {
                            officeId: office.id,
                        },
                        context,
                        info,
                    });
                },
            },
        }
    };

    const schema = mergeSchemas(
        {

            schemas: [employeeSchema, officeSchema, countrySchema, linkTypeDefs],
            resolvers: [linkResolvers]
        }
    );

    const server = new ApolloServer({ schema });

    server.listen(9007).then(({ url }) => {
        console.log(`7-schema-stitching-delegation Server ready at ${url}`);
    });
};

start();

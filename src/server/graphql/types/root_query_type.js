import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} from 'graphql';

const UserType  = require('./user_type').default
const CountryType  = require('./country_type').default

const CountryService = require('../../services/country')
import { checkRoleAndResolveAsync } from '../guards/guardResolvers'

export default new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            resolve(parentValue, args, ctx) {
                const req = ctx.req;
                return req.headers.authorization;
            }
        },
        countries: {
            type: new GraphQLList(CountryType),
            async resolve(parentValue, args, ctx) {
                return await checkRoleAndResolveAsync(ctx, CountryService.allCountries, null, ["admin"]);
            }
        },
        countryByCode: {
            type: CountryType,
            args: {
                code: { type: GraphQLString }
            },
            async resolve(parentValue, { code }, ctx) {
                return await checkRoleAndResolveAsync(ctx, CountryService.getCountryByCode, code, ["admin"]);
            }
        }
    }
})
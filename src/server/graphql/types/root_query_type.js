import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} from 'graphql';

const UserType  = require('./user_type').default
const CountryType  = require('./country_type').default

const AdminService = require('../../services/admin')
import AuthenticationService from '../../services/authentication'
import jwt from 'jsonwebtoken'
import Config from '../../../../utilities/Config'

export default new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            resolve(parentValue, args, ctx) {
                const req = ctx.req;
                return req.user;
            }
        },
        // countries: {
        //     type: new GraphQLList(CountryType),
        //     resolve(parentValue, args) {
        //         return AdminService.allCountries()
        //     }
        // },
        countries: {
            type: new GraphQLList(CountryType),
            resolve(parentValue, args, ctx) {
                return checkAuthAndResolve(ctx, AdminService.allCountries());
            }
        },
        countryByCode: {
            type: CountryType,
            args: {
                code: { type: GraphQLString }
            },
            resolve(parentValue, { code }) {
                return AdminService.getCountryByCode(code)
            }
        }
    }
})
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLFloat
} = graphql;

const UserType = require('./types/user_type').default;
const UserResetType = require('./types/user_reset_type').default;
const AuthService = require('../services/auth');

const CountryType = require('./types/country_type').default
const AdminService = require('../services/admin')

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                role: { type: GraphQLString }
            },
            resolve(parentValue, { email, password, role }, ctx ) { //request is request object from express
                const req = ctx.req;
                return AuthService.signup({ email, password, role, req});
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, ctx) {
                const req = ctx.req;
                const { user } = req;
                req.logout();
                return user;
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, ctx) {
                const req = ctx.req;
                return AuthService.login({ email, password, req });
            }
        },
        resetLink: {
            type: UserResetType,
            args: {
                email: { type: GraphQLString },
                timeZone: { type: GraphQLString }
            },
            resolve(parentValue, { email, timeZone }, ctx) {
                return AuthService.resetLink({ email, timeZone });
            }
        },
        resetPassword: {
            type: UserResetType,
            args: {
                token: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { token, password }, ctx) {
                const req = ctx.req;
                console.log("req.locale", req.locale)
                return AuthService.resetPassword({ token, password });
            }
        },
        mergeCountry: {
            type: CountryType,
            args: {
                code: { type: GraphQLString },
                name: { type: GraphQLString }
            },
            resolve(parentValue, { code, name }) {
                return AdminService.mergeCountry({ code, name });
            }
        },
        deleteCountry: {
            type: CountryType,
            args: {
                code: { type: GraphQLString }
            },
            resolve(parentValue, { code }) {
                return AdminService.deleteCountry({ code });
            }
        }
    }
});

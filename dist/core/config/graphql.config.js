"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGraphQLConfig = getGraphQLConfig;
const is_dev_util_1 = require("../../shared/utils/is-dev.util");
const path_1 = require("path");
function getGraphQLConfig(configService) {
    return {
        playground: (0, is_dev_util_1.isDev)(configService),
        path: configService.getOrThrow('GRAPHQL_PREFIX'),
        autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/core/graphql/schema.gql'),
        sortSchema: true,
        context: ({ req, res }) => ({ req, res })
    };
}
//# sourceMappingURL=graphql.config.js.map
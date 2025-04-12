"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_DEV_ENV = void 0;
exports.isDev = isDev;
const dotenv = require("dotenv");
dotenv.config();
function isDev(configService) {
    return configService.getOrThrow('NODE_ENV') === 'development';
}
exports.IS_DEV_ENV = process.env.NODE_ENV === 'development';
//# sourceMappingURL=is-dev.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const core_module_1 = require("./core/core.module");
const redis_service_1 = require("./core/redis/redis.service");
const ms_util_1 = require("./shared/utils/ms.util");
const parse_boolean_util_1 = require("./shared/utils/parse-boolean.util");
async function bootstrap() {
    const app = await core_1.NestFactory.create(core_module_1.CoreModule, { rawBody: true });
    const config = app.get(config_1.ConfigService);
    const redis = app.get(redis_service_1.RedisService);
    app.use(cookieParser(config.getOrThrow('COOKIES_SECRET')));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true
    }));
    const RedisStore = RedisStore(session);
    app.use(session({
        secret: config.getOrThrow('SESSION_SECRET'),
        name: config.getOrThrow('SESSION_NAME'),
        resave: false,
        saveUninitialized: false,
        cookie: {
            domain: config.getOrThrow('SESSION_DOMAIN'),
            maxAge: (0, ms_util_1.ms)(config.getOrThrow('SESSION_MAX_AGE')),
            httpOnly: (0, parse_boolean_util_1.parseBoolean)(config.getOrThrow('SESSION_HTTP_ONLY')),
            secure: (0, parse_boolean_util_1.parseBoolean)(config.getOrThrow('SESSION_SECURE')),
            sameSite: 'lax'
        },
        store: new RedisStore({
            client: redis,
            prefix: config.getOrThrow('SESSION_NAME')
        })
    }));
    app.enableCors({
        origin: config.getOrThrow('ALLOWED_ORIGIN'),
        credentials: true,
        exposedHeaders: ['set-cookie']
    });
    await app.listen(config.getOrThrow('APPLICATION_PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map
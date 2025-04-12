"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const core_module_1 = require("./core/core.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(core_module_1.CoreModule);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
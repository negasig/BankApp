"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const module_1 = require("./module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(module_1.AppModule);
    app.enableCors();
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_token_guard_1 = require("./check-token.guard");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const testing_1 = require("@nestjs/testing");
describe('CheckTokenGuard', () => {
    let guard;
    let httpService;
    let configService;
    beforeEach(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            providers: [
                check_token_guard_1.CheckTokenGuard,
                {
                    provide: axios_1.HttpService,
                    useValue: { get: jest.fn() },
                },
                {
                    provide: config_1.ConfigService,
                    useValue: { get: jest.fn() },
                },
            ],
        }).compile();
        guard = moduleRef.get(check_token_guard_1.CheckTokenGuard);
        httpService = moduleRef.get(axios_1.HttpService);
        configService = moduleRef.get(config_1.ConfigService);
    });
    it('should be defined', () => {
        expect(guard).toBeDefined();
    });
});
//# sourceMappingURL=check-token.guard.spec.js.map
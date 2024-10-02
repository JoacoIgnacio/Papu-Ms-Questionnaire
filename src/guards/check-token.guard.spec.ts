import { CheckTokenGuard } from './check-token.guard';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';

describe('CheckTokenGuard', () => {
  let guard: CheckTokenGuard;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CheckTokenGuard,
        {
          provide: HttpService,
          useValue: { get: jest.fn() },  // Simulamos el HttpService
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn() },  // Simulamos el ConfigService
        },
      ],
    }).compile();

    guard = moduleRef.get<CheckTokenGuard>(CheckTokenGuard);
    httpService = moduleRef.get<HttpService>(HttpService);
    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();  // La prueba ahora tiene argumentos simulados y debería pasar
  });
});

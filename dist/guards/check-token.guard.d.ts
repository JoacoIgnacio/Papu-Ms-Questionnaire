import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
export declare class CheckTokenGuard implements CanActivate {
    private readonly httpService;
    private readonly configService;
    private readonly MS_IAM_URL;
    constructor(httpService: HttpService, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

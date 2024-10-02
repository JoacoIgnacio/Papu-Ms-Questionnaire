import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { lastValueFrom} from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CheckTokenGuard implements CanActivate {
  private readonly MS_IAM_URL = 'http://localhost:3000';  // Define la URL del microservicio aquí directamente
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try{
      const request = context.switchToHttp().getRequest();
      const token = request.headers[`authorization`]?.split(' ')[1];
      const response = await lastValueFrom(
        this.httpService.get(
          `${this.configService.get<string>(this.MS_IAM_URL)}/auth/check-token`,
          {headers: {authorization: `Bearer ${token}`}},
        ),
      );

      return response.data.isValid;
    }catch(error){
      throw new UnauthorizedException();
    }
  }
}
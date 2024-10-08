import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CheckTokenGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]; // Extraer el token del encabezado Authorization

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    // Verificar el token con el microservicio de autenticación (ms-iam)
    const msIamUrl = this.configService.get<string>('MS_IAM_URL') || 'http://localhost:3000'; // URL del microservicio IAM
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${msIamUrl}/auth/check-token`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );

      // Si la respuesta es exitosa y el token es válido (aceptamos tanto 200 como 201)
      return response.status === 200 || response.status === 201;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

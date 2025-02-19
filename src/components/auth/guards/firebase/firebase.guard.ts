import { FirebaseService } from '@config/firebase/firebase.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) { }
  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      throw new UnauthorizedException('No se encontró el token de autorización.');
    }
    try {
      request.user = await this.firebaseService.verifyToken(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado.');
    }
  }
}

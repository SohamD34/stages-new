import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';  // Correct import from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}  // Inject JwtService directly here

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];  // Extract the token

    if (!token) {
      return false;
    }

    try {
      const user = await this.jwtService.verifyAsync(token);  // Verify JWT token
      request.user = user;  // Attach the user to the request object
      return true;
    } catch (error) {
      return false;  // If verification fails, return false
    }
  }
}

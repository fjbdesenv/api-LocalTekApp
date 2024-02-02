import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { Token } from '../class/Token';

@Injectable()
export class CheckAuth implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) { }

    verificarToken({ token }: Token) {
        try {
            return this.jwtService.verify(
                token,
                { secret: process.env.JWT_SECRET }
            );
        } catch (error) {
            return false;
        }
    }

    use(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;

        if (!authorization) throw new UnauthorizedException();

        const aux: Array<string> = authorization.split(' ');
        const token: Token = new Token(aux[0], aux[1]);

        if (token.type != 'Bearer' || !token.token) throw new UnauthorizedException('Token is not a bearer token');
        if (!this.verificarToken(token)) throw new UnauthorizedException();

        next();
    }
}

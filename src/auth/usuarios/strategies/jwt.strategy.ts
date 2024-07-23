import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";
import { UnauthorizedException } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET,

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }


    async validate(payload: JwtPayload) {
        const { email } = payload;

        const user = await this.usuarioRepository.findOneBy({ email });

        if (!user) {
            throw new UnauthorizedException("Token not valid")
        }

        return user;
    }
}
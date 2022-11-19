import { CreateProfessorDto } from "@models/professor";
import { ProfessorService } from "@modules/professor";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Tokens, JwtPayload } from "@types";
import { verify, hash } from "argon2";
import { SignInDto } from "../dto";

@Injectable()
export class ProfessorAuthService {
  constructor(
    private professorService: ProfessorService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  //DB CHANGES
  async signup_local(professorDto: CreateProfessorDto): Promise<Tokens> {
    await this.professorService.create(professorDto);
    const new_professor = await this.professorService.findOneByEmail(professorDto.email)
    const tokens = await this.getTokens(new_professor.code, new_professor.email);
    await this.updateRtHash(new_professor.code, tokens.refresh_token);

    return tokens;
  }

  async signin_local(authInfo: SignInDto): Promise<Tokens> {
    const professor = await this.professorService.findOneByEmail(authInfo.email);
    
    if (!professor) throw new UnauthorizedException();

    const password_match = await verify(professor.password, authInfo.password);
    if (!password_match) throw new UnauthorizedException();

    const tokens = await this.getTokens(professor.code, professor.email);
    await this.updateRtHash(professor.code, tokens.refresh_token);

    return tokens;
  }

  async logout(code: string) {
    await this.professorService.update(code, {
      hashedRefreshToken: null
    });
  }

  async updateRefreshToken(code: string, refresh_token: string) {
    const professor = await this.professorService.findOne(code);
    console.log(professor);
    
    if (!professor || !professor.hashedRefreshToken)
      throw new NotFoundException('Professor not found');

    const rt_match = await verify(professor.hashedRefreshToken, refresh_token);
    if (!rt_match) throw new UnauthorizedException();

    const tokens = await this.getTokens(professor.code, professor.email);
    await this.updateRtHash(professor.code, tokens.refresh_token);

    return tokens;
  }

  //HELP FUNCTIONS

  async updateRtHash(code: string, refresh_token: string) {
    const hash = await this.hashData(refresh_token);

    await this.professorService.update(code, {
      hashedRefreshToken: hash
    });
  }

  hashData(data: string) {
    return hash(data);
  }

  async getTokens(sub: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub,
      email
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: '10h'
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d'
      })
    ]);

    return {
      refresh_token,
      access_token
    };
  }
}
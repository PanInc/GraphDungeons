import { CreateProfessorDto } from "@models/professor";
import { CreateStudentDto } from "@models/student";
import { StudentService } from "@modules/student";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Tokens, JwtPayload } from "@types";
import { verify, hash } from "argon2";
import { SignInDto } from "../dto";

@Injectable()
export class StudentAuthService {
  constructor(
    private studentService: StudentService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  //DB CHANGES
  async signup_local(studentDto: CreateStudentDto): Promise<Tokens> {
    await this.studentService.create(studentDto);
    const new_student = await this.studentService.findOneByEmail(studentDto.email)
    const tokens = await this.getTokens(new_student.id, new_student.email);
    await this.updateRtHash(new_student.id, tokens.refresh_token);

    return tokens;
  }

  async signin_local(authInfo: SignInDto): Promise<Tokens> {
    const student = await this.studentService.findOneByEmail(authInfo.email);

    if (!student) throw new UnauthorizedException();

    const password_match = await verify(student.password, authInfo.password);
    if (!password_match) throw new UnauthorizedException();

    const tokens = await this.getTokens(student.id, student.email);
    await this.updateRtHash(student.id, tokens.refresh_token);

    return tokens;
  }

  async logout(studentId: string) {
    await this.studentService.update(studentId, {
      hashedRefreshToken: null
    });
  }

  async updateRefreshToken(studentId: string, refresh_token: string) {
    const student = await this.studentService.findOne(studentId);
    if (!student || !student.hashedRefreshToken)
      throw new NotFoundException('student not found');

    const rt_match = await verify(student.hashedRefreshToken, refresh_token);
    if (!rt_match) throw new UnauthorizedException();

    const tokens = await this.getTokens(student.id, student.email);
    await this.updateRtHash(student.id, tokens.refresh_token);

    return tokens;
  }

  //HELP FUNCTIONS

  async updateRtHash(studentId: string, refresh_token: string) {
    const hash = await this.hashData(refresh_token);

    await this.studentService.update(studentId, {
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
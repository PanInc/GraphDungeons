import { RefreshTokenGuard } from 'src/common/guards';
import { CreateStudentDto } from '@models/student';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common';
import { Tokens } from '@types';
import {
  Public,
  GetCurrentUserId,
  GetCurrentUser
} from '@decorators';
import { SignInDto } from '../dto';
import { StudentAuthService } from './student-auth.service';

@Controller('auth/student')
export class StudentAuthController {
  constructor(private authService: StudentAuthService) { }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup_local(@Body() createStudentDto: CreateStudentDto): Promise<Tokens> {
    return this.authService.signup_local(createStudentDto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin_local(@Body() authDto: SignInDto): Promise<Tokens> {
    return this.authService.signin_local(authDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh_token(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string
  ) {
    return this.authService.updateRefreshToken(userId, refreshToken);
  }
}
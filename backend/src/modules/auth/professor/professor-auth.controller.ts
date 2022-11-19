import { CreateProfessorDto } from '@models/professor';
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
import { RefreshTokenGuard } from 'src/common/guards';
import { SignInDto } from '../dto';
import { ProfessorAuthService } from './professor-auth.service';

@Controller('auth/professor')
export class ProfessorAuthController {
  constructor(private authService: ProfessorAuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup_local(@Body() createProfessorDto: CreateProfessorDto): Promise<Tokens> {
    return this.authService.signup_local(createProfessorDto);
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

  @Public()
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
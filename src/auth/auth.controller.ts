import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser, RawHeaders } from './decorators';
import { User } from './entities/user.entity';
import { UseRoleGuard } from './guards/use-role/use-role.guard';
import { RoleProtected } from './decorators/role-protected/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'Login Successful' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }


  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(@GetUser() user:User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user:User,
    @GetUser('email') userEmail:string,
    @RawHeaders() rawHeaders:string[],
    
  ) {
    
    return {
      
      ok: true,
      message: 'This is a private route',
      user,
      userEmail,
      rawHeaders
    }
  }



  @Get('private2')
  // @SetMetadata('roles', ['admin', 'super-user'])
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UseRoleGuard)
  privateRoute2(
    @GetUser () user:User,
  ) {
    return {
      ok: true,
      user
    }
  }


  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3(
    @GetUser () user:User,
  ) {
    return {
      ok: true,
      user
    }
  }


 
}

import {
  Controller,
  Req,
  Get,
  Post,
  HttpCode,
  Res,
  Body,
  Param,
} from '@nestjs/common';
import { query, Request, Response } from 'express';
import { CreateUsersDTO } from '../dto';

var USERS = [];

@Controller('/users')
export class UsersController {
  // Set Method and API name Like get is method and profile is API name
  //   @Get('/profile')
  //   // Function Name
  //   getProfiles(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  //     res.status(200);
  //     return { Hello: 'World' };
  //   }

  // @Post('/register')
  // postregister(@Body() requestData: registerDTo, res: Response) {
  //   console.log(requestData);
  //   return { Hello: 'World' };
  // }

  @Post('/user_register')
  addUser(
    @Body() CreateUsersDTo: CreateUsersDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    USERS.push(CreateUsersDTo);
    return 'User Added';
  }

  @Get('/allUser')
  getuser() {
    return USERS;
  }

  @Get('/userDetails/:mobile')
  getuserDetails(@Param('mobile') mobile: string) {
    console.log(USERS.find((user) => user.mobile === mobile));
    // return false;
    let result = USERS.find((user) => user.mobile === mobile);
    if (result) {
      return result;
    } else {
      return 'No data Found';
    }
  }

  @Get('/deleteUser/:mobile')
  deleteUserDetails(@Param('mobile') mobile: string) {
    let result = USERS.pop(mobile);
    if (result) {
      return result;
    } else {
      return 'No data Found';
    }
  }
}

// passthrough true it means it self return the value to response

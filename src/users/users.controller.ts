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

  @Get('/userDetails/:id')
  getuserDetails(@Param('id') id: number) {
    console.log(id);
    console.log(USERS.find((user) => user.id == id));
    // return false;
    let result = USERS.find((user) => user.id == id);
    if (result) {
      return result;
    } else {
      return 'No data Found';
    }
  }

  @Post('/update_user')
  updateUser(
    @Body() UpdateUsersDTo: CreateUsersDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    let id = req.body.id;
    let userInd = USERS.findIndex((user) => user.id == id);
    console.log(userInd);
    if (!userInd) {
      return 'NO Data Found';
    }

    USERS[userInd] = UpdateUsersDTo;
    return 'Profile has been updated';
  }

  @Post('/deleteUser/:id')
  deleteUserDetails(@Param('id') id: number) {
    let result = USERS.filter((user) => user.id != id);
    if (result) {
      return result;
    } else {
      return 'No data Found';
    }
  }
}

// passthrough true it means it self return the value to response

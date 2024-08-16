import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { NatsMessage } from '../decorators';
import { UserService } from 'src/users/users.service';

@Controller()
export class CashPointController {
  constructor(private readonly usersService: UserService) {}

  @NatsMessage(['ShopApp', 'getUserById'])
  getOne(@Payload() data: { userId: string }): Promise<any> {
    console.log('!!!!!!');
    const isUser = this.usersService.getSingleUser(data.userId);
    return isUser;
  }
}

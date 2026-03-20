import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//local passport strategy has a built in guard that we can use to protect our routes, we just need to extend it and specify the strategy we want to use
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

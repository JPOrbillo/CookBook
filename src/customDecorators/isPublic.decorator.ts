import { SetMetadata } from '@nestjs/common';

//use this to make a route public and not require authentication, for example the login and register routes
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
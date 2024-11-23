import { SetMetadata } from '@nestjs/common';
import { PUBLIC_ROUTE } from './constants/index';

export const PublicRoute = () => SetMetadata(PUBLIC_ROUTE, true);
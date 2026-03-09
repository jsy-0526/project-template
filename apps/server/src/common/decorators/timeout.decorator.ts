import { SetMetadata } from '@nestjs/common';

export const TIMEOUT_KEY = 'timeout';
export const Timeout = (ms: number) => SetMetadata(TIMEOUT_KEY, ms);

import { Session } from 'express-session';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class SessionInfo  {
  @ApiPropertyOptional()
  uid?: string;
  @ApiPropertyOptional()
  name?: string;
};

export type SessionType = Session & SessionInfo;
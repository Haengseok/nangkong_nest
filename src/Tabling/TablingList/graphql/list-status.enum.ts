import { registerEnumType } from '@nestjs/graphql';

export enum ListStatus {
  RUN = 'RUN',
  COMPLETE = 'COMPLETE',
  WAITING = 'WAITING',
}

registerEnumType(ListStatus, {
  name: 'ListStatus',
});

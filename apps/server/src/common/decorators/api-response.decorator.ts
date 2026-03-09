import { Type } from '@nestjs/common';

export const ApiResponse = <TModel extends Type<any>>(model: TModel) => {
  return () => {};
};

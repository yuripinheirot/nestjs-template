import { Test } from '@nestjs/testing';

import { AppModule } from '@/modules/app.module';

export const buildTestingModule = () => {
  return Test.createTestingModule({
    imports: [AppModule],
  });
};

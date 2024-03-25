import { Test } from '@nestjs/testing';

import { AppModule } from '@/app.module';

export const buildTestingModule = () => {
  return Test.createTestingModule({
    imports: [AppModule],
  });
};

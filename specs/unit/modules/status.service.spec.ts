import { StatusService } from '@/modules/status/status.service';

describe('[UNIT] [status/status.service] - [getStatus()]', () => {
  const sut = new StatusService();

  test('should return the status message', () => {
    const result = sut.getStatus();
    expect(result).toEqual({ message: 'Service is up and running!' });
  });
});

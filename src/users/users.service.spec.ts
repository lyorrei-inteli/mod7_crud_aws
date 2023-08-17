import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateReconstruireId', () => {
    it('should generate a valid ReconstruireId', () => {
      const id = service.generateReconstruireId();
      const currentYear = new Date().getFullYear().toString();
      // Checking if the ID starts with the current year.
      expect(id.startsWith(currentYear)).toBe(true);

      // Checking the general pattern of the ID (e.g., YYYY-XXXXXX where X is a hexadecimal character).
      const pattern = new RegExp(`^${currentYear}-[a-fA-F0-9]{12}$`); // Assuming you're using a 6-byte (12-character) hash
      expect(pattern.test(id)).toBe(true);
    });
  });
});

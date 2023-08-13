import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { instanceToPlain } from 'class-transformer';
import { OneMapModule } from '../../one-map/one-map.module';
import { OneMapService } from '../../one-map/one-map.service';
import { Account } from '../auth.model';
import { AuthRepository } from '../auth.repository';
import { AuthService } from '../auth.service';
import { AccountStub, JwtStub, SingpassCallbackStub } from './auth.stub';

const mockGetAccount = jest.fn();
jest.mock('../auth.repository', () => ({
  AuthRepository: jest.fn().mockImplementation(() => ({
    getAccount: mockGetAccount,
    createAccount: jest.fn(),
  })),
}));
jest.mock('../../one-map/one-map.service', () => ({
  OneMapService: jest.fn().mockImplementation(() => ({
    searchAddress: jest.fn().mockResolvedValue([AccountStub().location]),
  })),
}));
jest.mock('uuid', () => ({ v4: () => '123' }));

describe('AuthService', () => {
  let authService: AuthService;
  let authRepository: AuthRepository;
  let oneMapService: OneMapService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OneMapModule, JwtModule],
      providers: [AuthService, AuthRepository],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authRepository = module.get<AuthRepository>(AuthRepository);
    oneMapService = module.get<OneMapService>(OneMapService);
    jwtService = module.get<JwtService>(JwtService);

    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
  });

  describe('authService', () => {
    it('should have a defined auth service', () => {
      expect(authService).toBeDefined();
    });

    it('should have a defined auth repository', () => {
      expect(authService).toBeDefined();
    });

    it('should have a defined oneMap service', () => {
      expect(oneMapService).toBeDefined();
    });

    it('should have a defined jwt service', () => {
      expect(jwtService).toBeDefined();
    });
  });

  describe('when createAccount is called', () => {
    beforeEach(() => {
      mockGetAccount.mockReset();
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(JwtStub());
    });

    it('should call auth repository if account does not exist', async () => {
      const { username: myInfoUsername, address } = SingpassCallbackStub();

      await authService.createAccount(myInfoUsername, address);

      const { username, location } = AccountStub();
      expect(authRepository.createAccount).toBeCalledWith(
        new Account('123', username, location, false, new Date()),
      );
    });

    it('should not create a new account but sign the token if account exists', async () => {
      const { username: myInfoUsername, address } = SingpassCallbackStub();
      const account = AccountStub();
      mockGetAccount.mockResolvedValue(account);

      await authService.createAccount(myInfoUsername, address);

      expect(authRepository.createAccount).not.toHaveBeenCalled();
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        instanceToPlain(account),
      );
    });
  });

  describe('when validateToken is called', () => {
    it('should call jwt service', async () => {
      const token = 'test';
      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockResolvedValue({ username: 'test' });

      await authService.validateToken(token);

      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token, {
        secret: process.env.AUTH_SECRET,
      });
    });
  });
});

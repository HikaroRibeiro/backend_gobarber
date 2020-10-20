import 'reflect-metadata';

import AppError from '@shared/errors/AppErrors';

import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUserService',() => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();

        authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
        createUser= new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
    })
    it('it should be able to authenticate', async () => {

        const newUser = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        const response = await authenticateUser.execute({
            email: 'johndoe@gmail.com',
            password: '123456'
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(newUser);
    });

    it('should not be able to authenticate with non existing user', async () => {

        await expect(
            authenticateUser.execute({
                email: 'johndoe@gmail.com',
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('it should not be able to authenticate with wrong password', async () => {

        const newUser = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })


        await expect(authenticateUser.execute(
            {
                email: 'johndoe@gmail.com',
                password: 'wrong-password'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
})
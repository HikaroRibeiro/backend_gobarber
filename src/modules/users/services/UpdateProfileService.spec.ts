import 'reflect-metadata';

import AppError from '@shared/errors/AppErrors';

import UpdateProfileService from './UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;


describe('UpdateProfile',() => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfileService = new UpdateProfileService(
            fakeUsersRepository, 
            fakeHashProvider,
        );
    })
    it('should be able to update the profile', async () => {
        
        const user = await fakeUsersRepository.create({
            name: 'john doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Tree',
            email: 'johntree@gmail.com',   
        });

        expect(updatedUser.name).toBe('John Tree');
        expect(updatedUser.email).toBe('johntree@gmail.com');
    })

    it('should not be able to change to another user email', async () => {
        
        await fakeUsersRepository.create({
            name: 'john doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });

        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'test@gmail.com',
            password: '123456'
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'johndoe@gmail.com',   
        })).rejects.toBeInstanceOf(AppError);
    })

    it('should be able to update the password', async () => {
        
        const user = await fakeUsersRepository.create({
            name: 'john doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Tree',
            email: 'johntree@gmail.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    })

    it('should not be able to update the password without the old password', async () => {
        
        const user = await fakeUsersRepository.create({
            name: 'john doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'John Tree',
            email: 'johntree@gmail.com',
            password: '123123',
        })).rejects.toBeInstanceOf(AppError);

    })

    it('should not be able to update the password with wrong old password', async () => {
        
        const user = await fakeUsersRepository.create({
            name: 'john doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'John Tree',
            email: 'johntree@gmail.com',
            old_password: 'wrong-old-password',
            password: '123123',
        })).rejects.toBeInstanceOf(AppError);

    })

    it('should not be able to update profile to a non-existing user.', async () => {

        await expect (updateProfileService.execute({
            user_id: 'non-existing-user-id',
            name: 'Testes',
            email: 'testes@gmail.com'
        })).rejects.toBeInstanceOf(AppError);

    })

});
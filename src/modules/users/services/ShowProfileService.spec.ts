import 'reflect-metadata';

import AppError from '@shared/errors/AppErrors';

import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;


describe('UpdateProfile',() => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        
        showProfileService = new ShowProfileService(
            fakeUsersRepository, 
        );
    })
    it('should be able to show profile', async () => {
        
        const user = await fakeUsersRepository.create({
            name: 'john doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });

        const profile = await showProfileService.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('john doe');
        expect(profile.email).toBe('johndoe@gmail.com');
    })

    it('should not be able to show profile to a non-existing user.', async () => {

        await expect (showProfileService.execute({
            user_id: 'non-existing-user-id',
        })).rejects.toBeInstanceOf(AppError);

    })

    

});
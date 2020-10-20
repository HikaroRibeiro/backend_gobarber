import 'reflect-metadata';

import AppError from '@shared/errors/AppErrors';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;


describe('CreateAppointment',() => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        createAppointment = new CreateAppointmentService(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);

    })
    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date,'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        })
        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            user_id: 'user-id',
            provider_id: 'provider-id',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider-id');
    })


    it('should not be able to create a two appointments on the same time', async () => {
        
        jest.spyOn(Date,'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        })

        const appointmentDate = new Date(2020, 4, 10, 15);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: 'provider-id',
            user_id: 'user-id',
        });
        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: 'provider-id',
                user_id: 'user-id',
            })).rejects.toBeInstanceOf(AppError);
    })

    it('should be able to create an appointments on a past date', async () => {
        jest.spyOn(Date,'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        })

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                provider_id: '12341566',
                user_id: '12341566',
            })).rejects.toBeInstanceOf(AppError);
    })

    it('should be able to create an appointment with same user as provider', async () => {
        jest.spyOn(Date,'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        })

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 13),
                provider_id: 'user-id',
                user_id: 'user-id',
            })).rejects.toBeInstanceOf(AppError);
    })

    it('should be able to create an appointment before 8am and after 6pm', async () => {
        jest.spyOn(Date,'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        })

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 7),
                provider_id: 'provider-id',
                user_id: 'user-id',
            })).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 18),
                provider_id: 'provider-id',
                user_id: 'user-id',
            })).rejects.toBeInstanceOf(AppError);
    })


})
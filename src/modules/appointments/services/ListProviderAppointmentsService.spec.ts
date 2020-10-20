import 'reflect-metadata';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmensRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointmentsyarn ',() => {
    beforeEach(() => {
        fakeAppointmensRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmensRepository, fakeCacheProvider);

    })
    it('should be able to list the appointments on a specific day', async () => {
        
        const appointment1 = await fakeAppointmensRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0),
        })

        const appointment2 = await fakeAppointmensRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0),
        })
        
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 20, 11).getTime();
        })

        const appointments = await listProviderAppointmentsService.execute({
            provider_id: 'provider',
            year: 2020,
            month: 5,
            day: 20,
        });
        expect(appointments).toEqual([appointment1, appointment2])
    })

})
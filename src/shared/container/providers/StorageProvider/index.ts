import {container} from 'tsyringe';
import uploadConfig from '@config/upload';

import IStoragelProvider from './models/IStorageProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';

import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
    disk: DiskStorageProvider,
    S3: S3StorageProvider,
}

container.registerSingleton<IStoragelProvider>(
    'StorageProvider',
    providers[uploadConfig.driver],   
)
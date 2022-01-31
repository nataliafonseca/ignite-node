import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { EtherealMailProvider } from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import { SESMailProvider } from '@shared/container/providers/MailProvider/implementations/SESMailProvider';
import { LocalStorageProvider } from '@shared/container/providers/StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from '@shared/container/providers/StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { container } from 'tsyringe';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

const mailType = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailType[process.env.MAIL_PROVIDER],
);

const storageType = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storageType[process.env.STORAGE_PROVIDER],
);

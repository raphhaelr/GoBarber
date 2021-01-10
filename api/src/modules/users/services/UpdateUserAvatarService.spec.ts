import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update a user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const { id } = await fakeUsersRepository.create({
      email: 'user@email.com',
      name: 'User',
      password: '123456',
    });

    const user = await updateUserAvatar.execute({
      avatar_filename: 'avatar.png',
      user_id: id,
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        avatar_filename: 'avatar.png',
        user_id: 'invalid-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete a old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      name: 'User',
      password: '123456',
    });

    await updateUserAvatar.execute({
      avatar_filename: 'avatar.png',
      user_id: user.id,
    });

    await updateUserAvatar.execute({
      avatar_filename: 'avatar2.png',
      user_id: user.id,
    });

    expect(user.avatar).toBe('avatar2.png');
    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
  });
});

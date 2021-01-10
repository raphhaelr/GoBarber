import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';

export default class UsersRepository implements IUsersRepository {
  private usersRepository: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.usersRepository.find(findUser => findUser.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.usersRepository.find(
      findUser => findUser.email === email,
    );

    return user;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), email, name, password });

    this.usersRepository.push(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    const index = this.usersRepository.findIndex(
      findUser => findUser.id === user.id,
    );

    this.usersRepository[index] = user;

    return user;
  }
}

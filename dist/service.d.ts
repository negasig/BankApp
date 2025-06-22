import { User } from './model/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto';
export declare class AppService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    find(): Promise<User[]>;
    deletuser(id: number): string;
    findUserById(id: number): Promise<User | null>;
}

import { AppService } from './service';
import { User } from './model/user';
import { CreateUserDto } from './dto/CreateUserDto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    create(createuse: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    getUserByid(id: number): Promise<User | null>;
    deletuser(id: number): string;
}

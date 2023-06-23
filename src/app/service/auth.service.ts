import { Subject } from "rxjs";
import { User } from "../model/user.model";

export class AuthService{
    user = new Subject<User>();
    
}
import { auth } from 'firebase';

export interface User {
	uid: string;
    email: string;
    password: string;
}
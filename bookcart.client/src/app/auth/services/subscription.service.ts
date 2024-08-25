import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IUser } from '../../home/interfaces/IUser.interface';
import { IBook } from '../../home/interfaces/IBook.interface';

@Injectable({providedIn: 'root'})
export class SubscriptionService {

    public userData: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(new IUser());
    searchItemValue$ = new BehaviorSubject<string>('');
    wishlistItemcount$ = new Subject<number>();
    wishlistItem$ = new BehaviorSubject<IBook[]>([]);
    cartItemcount$ = new Subject<number>();
  

    constructor() { }
    
}
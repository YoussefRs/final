import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Ce service sert à récuperer le nom de l'utilisateur lors de son login
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.asObservable();
  }
}
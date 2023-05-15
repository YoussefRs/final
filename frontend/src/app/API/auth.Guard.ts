import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthApi } from './auth.api';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authApi: AuthApi, private router: Router, private toastr: ToastrService,) { }

  canActivate(): boolean {
    if (this.authApi.isLoggedIn() ) {
      return true;
    } else {
      this.router.navigate(['/login'])
      this.toastr.error('Veuillez vous connecter pour accéder à cette page.')
      return false;
    }
  }
}
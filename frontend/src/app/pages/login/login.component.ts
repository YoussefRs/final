import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/API/UserService';
import { AuthApi } from 'src/app/API/auth.api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authApi: AuthApi, private userService: UserService, private toastr: ToastrService) {}
  ngOnInit(): void {
  }

  // login 
  onSubmit() {
    this.authApi.login(this.form).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.userService.setUser(data.username); // Passer le nom de l'utilsateur connecté pour l'afficher dans le navBar par suite
      },
      err => {
        this.toastr.error("veillez vérifier votre nom d'utilisateur/mot de passe!")
      }
    );
  }
}

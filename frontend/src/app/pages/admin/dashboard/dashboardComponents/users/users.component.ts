import { Component, OnInit } from '@angular/core';
import { AuthApi } from 'src/app/API/auth.api';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: any[] = [];
  formAjouter: any = {
    role: []
  };
  form: any = {
    role: []
  };
  roles = ["User", "Admin"];
  selectedRole: string = '';
  

  constructor (private authApi : AuthApi, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.authApi.getUsers().subscribe(users => { this.users = users}) 
  }
  onDelete(userId: number) {
    this.authApi.deleteUser(userId).subscribe((response) => {
      this.toastr.success(response.message)
      this.authApi.getUsers().subscribe(users => { this.users = users}) 
    }, err => {
      this.toastr.error(err.error.message)
    });
  }

  openModal() {
    this.form = {
      username: '',
      email: '',
      password: '',
      role: ''
    };

    const modelDiv = document.getElementById('myModal');
    if ( modelDiv != null) {
      modelDiv.style.display = 'block'
  }
  }
  openModalModif(user :any, userId: number) {
    this.form = {
      userId : user.id,
      username: user.username,
      email: user.email,
      password : '',
      role : user.roles[0].name
    };
    console.log(this.form)
    
    const modelDiv = document.getElementById('myModalModif');
    if ( modelDiv != null) {
      modelDiv.style.display = 'block'
  }
  }
  closeModal() {
    const modelDiv = document.getElementById('myModal');
    if ( modelDiv != null) {
      modelDiv.style.display = 'none'
      document.body.classList.add('modal-open');
  }
  }
  closeModalModif() {
    const modelDiv = document.getElementById('myModalModif');
    if ( modelDiv != null) {
      modelDiv.style.display = 'none'
      document.body.classList.add('modal-open');
  }
  }

  onCreateUser() {
    const newUser = {
      username: this.form.username,
      email: this.form.email,
      password: this.form.password,
      role: [this.selectedRole] 
    };
    this.authApi.register(newUser).subscribe(
      res => {
        this.toastr.success(res.message)
        this.authApi.getUsers().subscribe(users => { this.users = users}) 
        this.form = {
          username: '',
          email: '',
          password: '',
          role: ''
        };
      },
      err => {
        this.toastr.error(err.error.message)
      }
    );
    }

  OnUpdateUser (userId: string) {
    const user = {
      username: this.form.username,
      email: this.form.email,
      password: this.form.password,
      role: [this.form.role]
    };
    console.log(user)
    this.authApi.updateUser(userId, user).subscribe(
      data => {
        this.toastr.success(data.message)
        this.authApi.getUsers().subscribe(users => { this.users = users}) 
      }, err => {
        this.toastr.error(err.error.message)
      }
    )
  }
}



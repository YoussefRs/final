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

  // lors du l'initialisation du page, on va récuperer tous les utlisateurs
  ngOnInit(): void {
    this.authApi.getAllUsers().subscribe(users => { this.users = users}) 
  }

  // Supprimer un utlisateur
  onDelete(userId: number) {
    this.authApi.deleteUser(userId).subscribe((response) => {
      this.toastr.success(response.message)       // afficher un alerte du succés (green)
      this.authApi.getAllUsers().subscribe(users => { this.users = users})  // Pour metter à jour le tableau sans rafraîchir la page
    }, err => {
      this.toastr.error(err.error.message)
    });
  }

  // Initialiser le modal de l'ajout lors de chaque ouverture
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

  // Ouvrir la modal de modification de l'utilisateur
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
  // Fermer la modal de l'ajout
  closeModal() {
    const modelDiv = document.getElementById('myModal');
    if ( modelDiv != null) {
      modelDiv.style.display = 'none'
      document.body.classList.add('modal-open');
  }
  }

  // Fermer la modal de modification
  closeModalModif() {
    const modelDiv = document.getElementById('myModalModif');
    if ( modelDiv != null) {
      modelDiv.style.display = 'none'
      document.body.classList.add('modal-open');
  }
  }

  // Ajouter un nouveau utlisateur
  AddUser() {
    const newUser = {
      username: this.form.username,
      email: this.form.email,
      password: this.form.password,
      role: [this.selectedRole] 
    };
    this.authApi.AddUser(newUser).subscribe(
      res => {
        this.toastr.success(res.message) // afficher une alerte de succée (green)
        this.authApi.getAllUsers().subscribe(users => { this.users = users})  // Mettre à jour le tableau sans recharger la page
        this.form = {
          username: '',
          email: '',
          password: '',
          role: ''
        };
      },
      err => {
        this.toastr.error(err.error.message) // afficher une alerte d'erreur (red)
      }
    );
    }

  // Modifier un utilisateur existant
  EditUser (userId: string) {
    const user = {
      username: this.form.username,
      email: this.form.email,
      password: this.form.password,
      role: [this.form.role]
    };
    console.log(user)
    this.authApi.updateUser(userId, user).subscribe(
      data => {
        this.toastr.success(data.message) // afficher une alerte de succée (green)
        this.authApi.getAllUsers().subscribe(users => { this.users = users}) // Mettre à jour le tableau sans recharger la page
      }, err => {
        this.toastr.error(err.error.message) // afficher une alerte d'erreur (red)
      }
    )
  }
}



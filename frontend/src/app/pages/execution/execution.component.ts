import { Component, OnInit } from '@angular/core';
import { ProcedureApi } from 'src/app/API/procedure.api';
import { AuthApi } from 'src/app/API/auth.api';
import { UserService } from 'src/app/API/UserService';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

interface Error {
  line: number;
  position: number;
  text: string;
}

interface Program {
  name: string;
  id: number;
}

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.css']
})
export class ExecutionComponent implements OnInit {
  programs: Program[] = [];
  consoleText = '';
  errorList: Error[] = [];
  username = '';
  procedureName = '';
  notifications$: Observable<any>;
  programCount = 0;

  constructor(
    private procedureApi: ProcedureApi, 
    private authApi: AuthApi, 
    private userService: UserService, 
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router
  ) { 
    // Envoyer une rêquette chaque 4s pour vérifier si il y a une nouvelle procédure ajoutée et mettre la liste
    // des procédures à jour automatiquement
    this.notifications$ = timer(0, 4000) // Poll every 5 seconds
      .pipe(
        switchMap(() => this.http.get('http://localhost:8081/programs/procedures'))
      );
  }

  // Récuperer tous les procedure lors du démarrage de la page
  ngOnInit(): void {

        this.procedureApi.getProcedures().subscribe(programs => {
          this.programs = programs
        })
        // récuperer le nom de l'utilisateur connecté
        this.userService.getUser().subscribe((user: any) => {
          console.log(user)
          this.username = user
          
        });

        // poll for updates
        this.notifications$.subscribe(
          (programs: Program[]) => {
          // check if there are any new programs
          const newPrograms = programs.filter(program => !this.programs.some(p => p.id === program.id));

          if (newPrograms.length > 0) {
            // ajouter les nouvelle procedure au début du tableaur
            this.programs = [...newPrograms, ...this.programs];
          }
        },
        (error: any) => {
          console.error('Failed to get program updates', error);
        }
      );

        this.notifications$.pipe(take(1)).subscribe((initialPrograms: any) => {
          this.programs = initialPrograms.reverse();
          this.programCount = initialPrograms.length;
        });

        this.notifications$.subscribe(
          (programs) => {
            const newPrograms = programs.filter((program: any) => !this.programs.some((p) => p.id === program.id));
          
            this.programCount = programs.length;
            this.programs = programs.reverse().slice(0, 6);
          },
          (error) => {
            console.log(error)
          }
        );
  }

  // Executer une procedure
  execute(program: Program) {
    this.procedureApi.executeProcedure(program.name.toUpperCase()).subscribe((res: any) => {
      this.consoleText = res.message;
      this.errorList = res.errors;
    });
  }

  // Se déconnecter
  logOut() {
    this.authApi.logout().subscribe((response: any) => {
      this.router.navigate(['login']);
          return response;
    });
  }
  // Signaler une procédures
  signal(program : any) {  

    // Ceci c'est le message qui va étre enregistrer sous form d'un signal 
    //  dans la base de donnée et va être afficher dans le notification box de l'admin (notification)
    const notificationText = `${this.username} a signalé ${program.name}`;  

    
    const body = {
      notification: notificationText
    };

    // Report Controller
    this.procedureApi.reportProcedure(JSON.stringify(body)).subscribe((response: any) => {
      this.toastr.success('Rapport Envoyé.');
    }, (error: any) => {
      console.error('Echec.', error);
    });
  }
}

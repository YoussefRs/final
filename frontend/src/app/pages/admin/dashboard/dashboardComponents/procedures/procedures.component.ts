import { Component, OnInit } from '@angular/core';
import { ProcedureApi } from 'src/app/API/procedure.api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {
  procedures: any[] = [];
  body: string = '';
  selectedProcedure: String = "";
  consoleBody: String = "";
  

  constructor (private procedureApi : ProcedureApi, private toastr: ToastrService) {}

  // On va récuperer toues les procédure qui se trouve dans le bd pour l'afficher lors du chargement de la page
  ngOnInit(): void {
    this.procedureApi.getProcedures().subscribe(procedures =>
       { 
        this.procedures = procedures
      })
  }

  // Ouvrir la modal de l'ajout
  openModal() {
    const modelDiv = document.getElementById('myModal');
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

  // Afficher une procédure dans une modal console
  getProcedure(procedure: any) {
    const modelDiv = document.getElementById('myModalConsole');
    if ( modelDiv != null) {
      modelDiv.style.display = 'block'
  }
    this.selectedProcedure = procedure;
    const index = this.procedures.indexOf(procedure);
    this.consoleBody = this.procedures[index].body;
  }

  //Fermer le modal console (affichage du procédure)
  closeModalConsole() {
    const modelDiv = document.getElementById('myModalConsole');
    if ( modelDiv != null) {
      modelDiv.style.display = 'none'
      document.body.classList.add('modal-open');
  }
  }

  // Ajouter une nouvelle procédure
  onCreateProcedure() {
    this.procedureApi.addProcedure(this.body).subscribe(
      data => {
        this.toastr.success('Procédure enregistrée.')
        this.procedures.push(data);
        this.procedureApi.getProcedures().subscribe(procedures => {     // Mettre à jour le tableau des procédure sans recharger la page
          this.procedures = procedures;
        });
      }, err => {
        this.toastr.error(err.error.message)
      }
    )
  }

  // Supprimer une procédure
   handleDelete(log: any) {
        this.procedureApi.deletProcedure(log.name).subscribe(res => {

          this.toastr.success(`La procédure ${log.name} a été supprimée!`)

          this.procedureApi.getProcedures().subscribe(procedures =>     // Mettre à jour le tableau des procédure sans recharger la page
            { 
              this.procedures = procedures
           })
        })
      }

}

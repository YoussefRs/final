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

  ngOnInit(): void {
    this.procedureApi.getPrograms().subscribe(procedures =>
       { 
        this.procedures = procedures
      })
  }
  openModal() {
    const modelDiv = document.getElementById('myModal');
    if ( modelDiv != null) {
      modelDiv.style.display = 'block'
  }
  
  }

  getProcedure(procedure: any) {
    const modelDiv = document.getElementById('myModalConsole');
    if ( modelDiv != null) {
      modelDiv.style.display = 'block'
  }
    this.selectedProcedure = procedure;
    const index = this.procedures.indexOf(procedure);
    this.consoleBody = this.procedures[index].body;
  }
  closeModal() {
    const modelDiv = document.getElementById('myModal');
    if ( modelDiv != null) {
      modelDiv.style.display = 'none'
      document.body.classList.add('modal-open');
  }
  }

  closeModalConsole() {
    const modelDiv = document.getElementById('myModalConsole');
    if ( modelDiv != null) {
      modelDiv.style.display = 'none'
      document.body.classList.add('modal-open');
  }
  }

  onCreateProcedure() {
    this.procedureApi.addProcedure(this.body).subscribe(
      data => {
        this.toastr.success('Procédure enregistrée.')
        this.procedures.push(data);
        this.procedureApi.getPrograms().subscribe(procedures => {
          this.procedures = procedures;
        });
      }, err => {
        this.toastr.error(err.error.message)
      }
    )
  }
      handleDelete(log: any) {
        this.procedureApi.deletProcedure(log.name).subscribe(res => {

          this.toastr.success(`La procédure ${log.name} a été supprimée!`)

          this.procedureApi.getPrograms().subscribe(procedures =>
            { 
              this.procedures = procedures
           })
        })
      }

}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProcedureApi } from 'src/app/API/procedure.api';

@Component({
  selector: 'app-gestion-procedures',
  templateUrl: './gestion-procedures.component.html',
  styleUrls: ['./gestion-procedures.component.css']
})
export class GestionProceduresComponent implements OnInit {

  procLogs: any[] = [];
  procedureBody: string = '';
  body: string = '';
  selectedProcedure: string = "";
  consoleBody: string = "";
  procedureName: string = ""


  constructor(private procedureApi : ProcedureApi, private toastr: ToastrService) {}

  ngOnInit(): void {
      this.procedureApi.getProcedureLogs().subscribe(procLogs => {
        this.procLogs = procLogs.procLogs.filter((res : any) => res.error !== 'PL/SQL: Statement ignored' ).reverse()
        
      })
      
  }

  openModalModif(log: any) {
    const modelDiv = document.getElementById('myModal');
    if ( modelDiv != null ) {
      modelDiv.style.display = 'block'
  } 
    this.procedureName = log.name
    this.selectedProcedure = log;
    const index = this.procLogs.indexOf(log);
    this.consoleBody = this.procLogs[index].body;
  }

  closeModalModif() {

    const modelDiv = document.getElementById('myModal');
    if ( modelDiv != null) {
      modelDiv.style.display = 'none'
      document.body.classList.add('modal-open');
  }
  }
  updateProc() {
    this.procedureApi.updateProcedure( this.consoleBody, this.procedureName).subscribe(res => {
      this.toastr.success(res.message)
    }, err => {
      console.log(err)
    })
  }

}

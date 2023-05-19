import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProcedureApi } from 'src/app/API/procedure.api';


@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent {
  procLogs: any[] = [];
  procedureBody: string = '';
  body: string = '';
  selectedProcedure: string = "";
  consoleBody: string = "";
  procedureName: string = ""


  constructor(private procedureApi : ProcedureApi, private toastr: ToastrService) {}

  // Récuperer tous les rapport d'execution trouvés dans la base de données
  ngOnInit(): void {
      this.procedureApi.getProcedureLogs().subscribe(procLogs => {

        // Pour filtrer les rapport qui sont répétitives (PL/SQL: Statement ignored)
        this.procLogs = procLogs.procLogs.filter((res : any) => res.error !== 'PL/SQL: Statement ignored' ).reverse()
      })
      
  }

}

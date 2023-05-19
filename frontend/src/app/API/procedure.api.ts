import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

const PROG_API = 'http://localhost:8081/programs/';
const PROCEDURE_API = 'http://localhost:8081/programs/procedures';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/sql' })
};
const httpOptionsJson = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class ProcedureApi {

    constructor(private http: HttpClient) { }

// API des procédure

    //@route: /procedures
    //Ajouter une nouvelle procedure
    addProcedure(body: string): Observable<any> {
      return this.http.post(`${PROCEDURE_API }`, body, httpOptions)
    }

    //@route : /procedures
    //recevoir (getRequest) tous les procédures qui se trouvent dans la base de donnée
    getProcedures(): Observable<any> {
      return this.http.get(PROG_API + 'procedures');
    }

    //@route : /procedures/nom du procédure
    //executer un procedure /
    executeProcedure(name: string): Observable<any> {
      return this.http.post(`${PROCEDURE_API}/${name}`, httpOptions);
    }

    //Récuperer les rapports du bd
    getProcedureLogs(): Observable<any> {
      return this.http.get(PROCEDURE_API + '/logs');
    }

    //Supprimer un procédure
    deletProcedure(name: String): Observable<any> {
      return this.http.delete(`${PROCEDURE_API}/${name}`)
    }

    //Singaler une procédure
    reportProcedure(body: string) : Observable<any> {
      return this.http.post('http://localhost:8081/programs/notifications', body, httpOptionsJson);
    }

    //Récuperer tous les notification (partie admin)
    getAllNotifications() : Observable<any> {
      return this.http.get('http://localhost:8081/programs/allNotifications')
    }
    
    // Récuperer les statistiques
    getStats() : Observable <any> {
      return this.http.get('http://localhost:8081/programs/procedures/stats')
    }
    
  }
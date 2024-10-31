import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Especialidad } from "../model/especialidad";

@Injectable({
    providedIn: 'root'
})
export class EspecialidadService {
    private apiUrl = 'http://localhost:8080/especialidades';

    constructor(private http: HttpClient) { }

    
    getespecialidad(): Observable<Especialidad[]> {
        return this.http.get<Especialidad[]>(this.apiUrl);
      }
   

    getEspecialidadById(id: number): Observable<Especialidad> {
        return this.http.get<Especialidad>(`${this.apiUrl}/${id}`);
    }

    createEspecialidad(carrera: Especialidad): Observable<Especialidad> {
        return this.http.post<Especialidad>(this.apiUrl, carrera);
    }

    deleteEspecialidad(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
    updatEspecialidad(categoria: Especialidad, id: number): Observable<Especialidad> {
        return this.http.put<Especialidad>(`${this.apiUrl}/${id}`, categoria);
    }


}



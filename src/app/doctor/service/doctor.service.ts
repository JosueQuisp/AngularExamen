import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Doctor } from "../model/doctor";

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    private apiUrl = 'http://localhost:8080/doctores';

    constructor(private http: HttpClient) { }

    
    getdoctor(): Observable<Doctor[]> {
        return this.http.get<Doctor[]>(this.apiUrl);
      }
   

    getdoctorById(id: number): Observable<Doctor> {
        return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
    }

    createrDoctor(carrera: Doctor): Observable<Doctor> {
        return this.http.post<Doctor>(this.apiUrl, carrera);
    }

    deltedoctor(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
    updatedoctor(categoria: Doctor, id: number): Observable<Doctor> {
        return this.http.put<Doctor>(`${this.apiUrl}/${id}`, categoria);
    }


}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Doctor } from './model/doctor';
import { DoctorService } from './service/doctor.service';
import { Especialidad } from '../especialidad/model/especialidad';
import { EspecialidadService } from '../especialidad/service/especialidad.service';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    MessageModule,      // tambien para los mensjaes 
    ToastModule       // Para los mensajes
  ],
  providers: [MessageService],

  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {

  visible: boolean = false;

  doctor: Doctor = new Doctor;
  doctores: Doctor[] = [];

  especialidad: Especialidad = new Especialidad; 
  especialidades: Especialidad [] = []; 

  constructor(
    private doctorService: DoctorService,
    private especialidadService: EspecialidadService, 
    
    private mensajeService: MessageService

  ) { }


  ngOnInit(): void {
    this.listarDoctores();
    this.listarEspecialidades();
  }

  showDialog() {
    this.visible = true;
  }

  listarEspecialidades() {
    this.especialidadService.getespecialidad().subscribe(
      (data: Especialidad[]) => {
        this.especialidades = data;
      },
      (error) => {
        console.error('Error al obtener carreras', error);
      }
    );
  }

  listarDoctores(){ 
    this.doctorService.getdoctor().subscribe(
      (data: Doctor[]) => {
        this.doctores = data;
      },
      (error) => {
        console.error('Error al obtener carreras', error);
      }
    );


  }
  agregarDoctores() { 

    if(this.doctor.id === 0){
      this.doctorService.createrDoctor(this.doctor).subscribe(
        {
          next: () => {
            this.mensajeService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Carrera registrada',
            });
            this.listarDoctores(); // Actualizar la lista de carreras
            this.visible = false; // Cerrar el diálogo
  
          },
          error: () => {
            this.mensajeService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo agregar la carrera',
            });
          } 
        }
      );

    }else{
      this.doctorService.updatedoctor(this.doctor, this.doctor.id).subscribe(
        {
          next: () =>{
            this.mensajeService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Carrera actualizada',
            });
            this.listarDoctores(); // Actualizar la lista de carreras
            this.visible = false; // Cerrar el diálogo
          },
          error: () =>{
            this.mensajeService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar la carrera',
            });
          }
        }
      ); 

    }


  }
  editarDocrtores(doctor : Doctor){ 

    this.doctor = {...doctor};
    this.visible = true;

  }
  eliminarDoctores(id: number){
    this.doctorService.deltedoctor(id).subscribe (
      {
        next: () => {
          this.mensajeService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Carrera eliminada correctamente',
          });
          this.listarDoctores();
        }
        ,
        error: () => {
          this.mensajeService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar la carrera',
          });
        } 
      }
    );

  }

}

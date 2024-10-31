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
import { Especialidad } from './model/especialidad';
import { EspecialidadService } from './service/especialidad.service';

@Component({
  selector: 'app-especialidad',
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
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css'
})
export class EspecialidadComponent {

  
  visible: boolean = false;

  especialidad: Especialidad = new Especialidad; 
  especialidades: Especialidad [] = []; 

  constructor(
    private especialidadService: EspecialidadService, 
    private  mensajeService: MessageService
  ){}
   

  ngOnInit(): void {
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

  agregarEspecialidades(){

    if(this.especialidad.id === 0 ){
      this.especialidadService.createEspecialidad(this.especialidad).subscribe({
        next: () => {
          this.mensajeService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Carrera registrada',
          });
          this.listarEspecialidades(); // Actualizar la lista de carreras
          this.visible = false; // Cerrar el diálogo

        },
        error: () => {
          this.mensajeService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo agregar la carrera',
          });
        }
      });

    }else{ 
      this.especialidadService.updatEspecialidad(this.especialidad, this.especialidad.id).subscribe(
        {
          next: () =>{
            this.mensajeService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Carrera actualizada',
            });
            this.listarEspecialidades(); // Actualizar la lista de carreras
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

  editarEspecialida(especialidad: Especialidad){

    this.especialidad = { ...especialidad };
    this.visible = true;



  }
  eliminarEspecialidad(id: number){

    this.especialidadService.deleteEspecialidad(id).subscribe(
      {
        next: () => {
          this.mensajeService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Carrera eliminada correctamente',
          });
          this.listarEspecialidades();
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

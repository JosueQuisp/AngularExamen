export class Doctor {

    id : number;
    nombre : string;
    apellidos: string; 
    especialidad: string; 

    constructor(id: number = 0, nombre: string = '', apellidos: string = '', especialidad: string = '') {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos; 
        this.especialidad = especialidad; 
      }

}

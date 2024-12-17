import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaNatural } from 'src/app/models/persona-natural.model';
import { PersonaNaturalService } from 'src/app/services/persona-natural.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  personaNaturales: PersonaNatural[];
  regexFecha = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:00:00.000-[0-9:]{5}$');

  constructor(private service: PersonaNaturalService, private router: Router) {
    this.personaNaturales = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.personaNaturales = data;
      this.personaNaturales.forEach(element => {
        this.aplicarFuncionSiEsFecha(element);
      }); 
      console.log('Listado de personasNaturales:', this.personaNaturales);
      console.log(JSON.stringify(this.personaNaturales));
    });
  }

  deletePersonaNatural(id: number): void { // Cambiar el tipo a number
    Swal.fire({
      title: 'Eliminar PersonaNatural',
      text: '¿Está seguro que quiere eliminar este PersonaNatural?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#232323',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#1c1c1c',
      color: '#ffffff'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(data => {
          Swal.fire({
            title: 'Eliminado!',
            text: 'El PersonaNatural ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#232323',
            background: '#1c1c1c',
            color: '#ffffff'
          });
          this.ngOnInit();
        });
      }
    });

    console.log('Eliminar PersonaNatural con id:', id);
  }

  updatePersonaNatural(id: number): void { // Cambiar el tipo a number
    this.router.navigate(["personasNaturales/update/" + id]);
  }

  createPersonaNatural(): void {
    this.router.navigate(["personasNaturales/create"]);
  }

  viewPersonaNatural(id: number): void { // Cambiar el tipo a number
    this.router.navigate(["personasNaturales/view/" + id]);
  }

  // Función que recibe un objeto y aplica una función si la propiedad es una fecha

  aplicarFuncionSiEsFecha(obj: any) {
    for (let clave in obj) {
        if (obj.hasOwnProperty(clave)) {
            console.log(clave);
            if (this.regexFecha.test(obj[clave])) {
                console.log('Es una fecha');
                // Aplica la función si la propiedad es un objeto Date
                obj[clave] = this.formatDate(obj[clave]);
            }
        }
    }
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2); // Meses empiezan en 0
    const day = ('0' + d.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
  }

}

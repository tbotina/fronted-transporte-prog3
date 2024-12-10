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

  personaNatural: PersonaNatural[];

  constructor(private service: PersonaNaturalService, private router: Router) {
    this.personaNatural = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.personaNatural = data;
      console.log(JSON.stringify(this.personaNatural));
    });
  }

  deleteDepartment(_id: number): void { // Cambiar el tipo a number
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
        this.service.delete(_id).subscribe(data => {
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

    console.log('Eliminar PersonaNatural con _id:', _id);
  }

  updateDepartment(_id: number): void { // Cambiar el tipo a number
    this.router.navigate(["cliente/update/" + _id]);
  }

  createDepartment(): void {
    this.router.navigate(["cliente/create"]);
  }

  viewDepartment(_id: number): void { // Cambiar el tipo a number
    this.router.navigate(["cliente/view/" + _id]);
  }
}

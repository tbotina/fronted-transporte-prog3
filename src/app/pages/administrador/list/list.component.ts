import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador.model';
import { AdministradorService } from 'src/app/services/administrador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  administrador: Administrador[];

  constructor(private service: AdministradorService,private router:Router) { 
    this.administrador = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.administrador = data;
      console.log(JSON.stringify(this.administrador));

    });
  }
  deleteDepartment(_id: string): void {
    Swal.fire({
      title: 'Eliminar Administrador',
      text: '¿Está seguro que quiere eliminar este Administrador?',
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
            text: 'El Administrador ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#232323', 
            background: '#1c1c1c', 
            color: '#ffffff' 
          });
          this.ngOnInit();
        });
      }
    });

    console.log('Eliminar Administrador con _id:', _id);
  }

  updateDepartment(_id: string): void {
    this.router.navigate(["cliente/update/"+_id])

  }

  createDepartment(): void {
    this.router.navigate(["cliente/create"])

  }
  viewDepartment(_id: string): void {
    this.router.navigate(["cliente/view/"+_id])

  }
}

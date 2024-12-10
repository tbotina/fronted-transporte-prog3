import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DirListaOrden } from 'src/app/models/dir-lista-orden.model';
import { DirListaOrdenService } from 'src/app/services/dir-lista-orden.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dirlistaordenes: DirListaOrden[]

  constructor(private service:DirListaOrdenService, private router: Router) { 
    this.dirlistaordenes = []
   }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe(data => {
      this.dirlistaordenes = data;
      console.log(JSON.stringify(this.dirlistaordenes))
    });
  }

  createDirListaOrden(): void {
    this.router.navigate(["dirlistaordenes/create"])
  }

  viewDirListaOrden(id: number): void {
    this.router.navigate(["dirlistaordenes/view/" + id])
  }

  updateDirListaOrden(id: number): void {
    this.router.navigate(["dirlistaordenes/update/" + id])
  }

  deleteDirListaOrden(id: number): void {
    Swal.fire({
      title: 'Eliminar Dir Lista Orden',
      text: '¿Está seguro que quiere eliminar este Dir Lista Orden?',
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
            text: 'El Dir Lista Orden ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#232323',
            background: '#1c1c1c',
            color: '#ffffff'
          });
          this.ngOnInit();
        });
      }
    });
    console.log('Eliminar Dir Lista Orden con id:', id);
  }
}

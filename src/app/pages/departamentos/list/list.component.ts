import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Departamentos } from 'src/app/models/departamentos.module';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  departamentos: Departamentos[];

  constructor(private service: DepartamentosService,private router:Router) { 
    this.departamentos = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.departamentos = data;
      console.log(JSON.stringify(this.departamentos));
    });
  }
  deleteDepartment(id: number): void {
    Swal.fire({
      title: 'Eliminar departamento',
      text: '¿Está seguro que quiere eliminar este departamento?',
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
            text: 'El departamento ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#232323', 
            background: '#1c1c1c', 
            color: '#ffffff' 
          });
          this.ngOnInit();
        });
      }
    });

    console.log('Eliminar departamento con id:', id);
  }

  updateDepartment(id: number): void {
    this.router.navigate(["departamentos/update/"+id])

  }

  createDepartment(): void {
    this.router.navigate(["departamentos/create"])

  }
  viewDepartment(id: number): void {
    this.router.navigate(["departamentos/view/"+id])

  }
}

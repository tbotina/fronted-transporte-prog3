import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Servicios } from 'src/app/models/servicios.module';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  servicios: Servicios[];

  constructor(private service: ServiciosService, private router:Router) { 
    this.servicios = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.servicios = data;
      console.log(JSON.stringify(this.servicios));
    });
  }
  deleteServicio(id: number): void {
    Swal.fire({
      title: 'Eliminar servicio',
      text: '¿Está seguro que quiere eliminar este servicio?',
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
            text: 'El servicio ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#232323',  
            background: '#1c1c1c', 
            color: '#ffffff' 
          });
          this.ngOnInit();
        });
      }
    });
    console.log('Eliminar servicio con id:', id);
  }

  viewServicio(id:number){
    this.router.navigate(["servicios/view/"+id])
    console.log('Visualizar a ', id)
  }

  updateServicio(id: number): void {
    this.router.navigate(["servicios/update/"+id])
    console.log('Actualizar servicio con id:', id);
  }

  createServicio(): void {
    this.router.navigate(["servicios/create"])
    console.log('Crear un nuevo servicio');
  }
}

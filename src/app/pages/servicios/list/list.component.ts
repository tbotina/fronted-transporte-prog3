import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Servicios } from 'src/app/models/servicios.model';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  servicios: Servicios[];

  constructor(private service: ServiciosService,
     private router:Router,   
      private activateRoute: ActivatedRoute  
  ) { 
    this.servicios = [];
  }

  ngOnInit(): void {  
    switch (this.activateRoute.routeConfig?.path){
  
      case 'list/:id/hoteles':
        this.serviciosHoteles(this.activateRoute.snapshot.params.id);
        break;
  
      case 'list/:id/restaurantes':
        this.serviciosRestaurantes(this.activateRoute.snapshot.params.id);
        break;
  
      case 'list':
        this.list();
        break;
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.servicios = data;
      console.log(JSON.stringify(this.servicios));
    });
  }

  serviciosHoteles(id:number){
    this.service.serviciosHoteles(id).subscribe((data) => {
      this.servicios = data;
    });
  }

  serviciosRestaurantes(id:number){ 
    this.service.serviciosRestaurantes(id).subscribe((data) => {
      console.log(data)
      this.servicios = data;
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

import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  vehiculos: Vehiculo[]; // Array de vehiculo
  
  constructor(private service: VehiculoService,
              private router:Router) { 
    this.vehiculos = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    // Llamada al vehiculo para obtener la lista de vehiculo
    this.service.list().subscribe((data) => {
      this.vehiculos = data;
      }
    );
  }

  deleteVehiculo(id: number): void {
    Swal.fire({
      title: 'Eliminar vehiculo',
      text: '¿Está seguro que quiere eliminar este vehiculo?',
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
            text: 'El vehiculo ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#232323', 
            background: '#1c1c1c', 
            color: '#ffffff' 
          });
          this.ngOnInit();
        });
      }
    });
    console.log('Eliminar vehiculo con id:', id);
  }

  viewVehiculo(id:number){
    this.router.navigate(["vehiculos/view/"+id])
    console.log('Visualizar a ', id)
  }

  updateVehiculo(id: number): void {
    this.router.navigate(["vehiculos/update/"+id])
    console.log('Actualizar vehiculo con id:', id);
  }

  createVehiculo(): void {
    this.router.navigate(["vehiculos/create"])
    console.log('Crear un nuevo vehiculo');
  }

}

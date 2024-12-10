import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/models/direccion.module';
import { DireccionService } from 'src/app/services/direccion.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  direccion: Direccion[]; // Array de Direccion
  
  constructor(private service: DireccionService,
              private router:Router) { 
    this.direccion = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    // Llamada al Direccion para obtener la lista de Direccion
    this.service.list().subscribe((data) => {
      this.direccion = data;
      }
    );
  }

  deleteDireccion(id: number): void {
    Swal.fire({
      title: 'Eliminar Direccion',
      text: '¿Está seguro que quiere eliminar este Direccion?',
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
            text: 'El Direccion ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#232323', 
            background: '#1c1c1c', 
            color: '#ffffff' 
          });
          this.ngOnInit();
        });
      }
    });
    console.log('Eliminar Direccion con id:', id);
  }

  viewDireccion(id:number){
    this.router.navigate(["direccion/view/"+id])
    console.log('Visualizar a ', id)
  }

  updateDireccion(id: number): void {
    this.router.navigate(["direccion/update/"+id])
    console.log('Actualizar Direccion con id:', id);
  }

  createDireccion(): void {
    this.router.navigate(["direccion/create"])
    console.log('Crear un nuevo Direccion');
  }

}

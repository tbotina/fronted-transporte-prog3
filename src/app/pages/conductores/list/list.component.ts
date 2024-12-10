import { Component, OnInit } from '@angular/core';
import { Conductor } from 'src/app/models/conductor.model';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  conductores: Conductor[]; // Array de conductor
  
  constructor(private service: ConductorService,
              private router:Router) { 
    this.conductores = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    // Llamada al conductor para obtener la lista de conductor
    this.service.list().subscribe((data) => {
      this.conductores = data;
      }
    );
  }

  deleteConductor(id: number): void {
    Swal.fire({
      title: 'Eliminar conductor',
      text: '¿Está seguro que quiere eliminar este conductor?',
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
            text: 'El conductor ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#232323', 
            background: '#1c1c1c', 
            color: '#ffffff' 
          });
          this.ngOnInit();
        });
      }
    });
    console.log('Eliminar conductor con id:', id);
  }

  viewConductor(id:number){
    this.router.navigate(["conductores/view/"+id])
    console.log('Visualizar a ', id)
  }

  updateConductor(id: number): void {
    this.router.navigate(["conductores/update/"+id])
    console.log('Actualizar conductor con id:', id);
  }

  createConductor(): void {
    this.router.navigate(["conductores/create"])
    console.log('Crear un nuevo conductor');
  }

}

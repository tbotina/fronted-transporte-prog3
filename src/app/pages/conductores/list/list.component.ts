import { Component, OnInit } from '@angular/core';
import { Conductor } from 'src/app/models/conductor.model';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  conductores: Conductor[]; // Array de conductor

  regexFecha = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:00:00.000-[0123456789:]{5}$');


  constructor(private service: ConductorService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
    this.conductores = [];
  }

  ngOnInit(): void {

    switch (this.activateRoute.routeConfig?.path) {

      case 'list/:id/vehiculos':
        this.conductoresVehiculos(this.activateRoute.snapshot.params.id);
        break;

      case 'list':
        this.list();
        break;
    }
    
  }

  list() {
    // Llamada al conductor para obtener la lista de conductor
    this.service.list().subscribe((data) => {
      this.conductores = data;
      this.conductores.forEach(conductor => {
        this.aplicarFuncionSiEsFecha(conductor);
      });
    }
    );
  }

  conductoresVehiculos(id: any) {
    this.service.conductoresVehiculos(id).subscribe((data) => {
      console.log(data);
      this.conductores = data;
      this.conductores.forEach(dueno => {
        this.aplicarFuncionSiEsFecha(dueno);
      });
    });
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

  viewConductor(id: number) {
    this.router.navigate(["conductores/view/" + id])
    console.log('Visualizar a ', id)
  }

  updateConductor(id: number): void {
    this.router.navigate(["conductores/update/" + id])
    console.log('Actualizar conductor con id:', id);
  }

  createConductor(): void {
    this.router.navigate(["conductores/create"])
    console.log('Crear un nuevo conductor');
  }

  // Función para aplicar una función a un objeto si es una fecha

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

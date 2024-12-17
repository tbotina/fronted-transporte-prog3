import { Component, OnInit } from '@angular/core';
import { RutaService } from 'src/app/services/ruta/ruta.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Ruta } from 'src/app/models/ruta.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  rutas: Ruta[]
  constructor(private service: RutaService, private router: Router,
    private activateRoute: ActivatedRoute
  ) { 
    this.rutas = []
  }

  ngOnInit(): void {

    switch (this.activateRoute.routeConfig?.path) {

      case 'list/:id/vehiculos':
        this.rutasVehiculos(this.activateRoute.snapshot.params.id);
        break;

      case 'list':
        this.list();
        break;
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.rutas = data;
      console.log(JSON.stringify(this.rutas))
    });
  }

  rutasVehiculos(id: any) {
    this.service.rutasVehiculos(id).subscribe((data) => {
      console.log(data);
      this.rutas = data;
    });
  }

  createRuta(): void {
    this.router.navigate(["rutas/create"])
  }

  viewRuta(id: number): void {
    this.router.navigate(["rutas/view/" + id])
  }

  updateRuta(id: number): void {
    this.router.navigate(["rutas/update/" + id])
  }

  deleteRuta(id: number): void {
    Swal.fire({
      title: 'Eliminar ruta',
      text: '¿Está seguro que quiere eliminar este ruta?',
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
            text: 'El ruta ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#232323',
            background: '#1c1c1c',
            color: '#ffffff'
          });
          this.ngOnInit();
        });
      }
    });
    console.log('Eliminar ruta con id:', id);
  }
}

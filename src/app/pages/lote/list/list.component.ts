import { Component, OnInit } from '@angular/core';
import { LoteService } from 'src/app/services/lote.service';
import { Lote } from 'src/app/models/lote.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  regexFecha = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}T00:[0-9]{2}:00.000-[0123456789:]{5}$');
  lotes: Lote[];

  constructor(private service: LoteService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.lotes = []
  }

  ngOnInit(): void {
    switch (this.activateRoute.routeConfig?.path) {

      case 'list/:id/rutas':
        this.lotesRutas(this.activateRoute.snapshot.params.id);
        break;

      case 'list/:id/listarorden':
        this.lotesDirlistaOrden(this.activateRoute.snapshot.params.id);
        break;

      case 'list/:id/productos':
        this.lotesProductos(this.activateRoute.snapshot.params.id);
        break;

      case 'list':
        this.list();
        break;

    }

  }

  list() {
    this.service.list().subscribe((data) => {
      this.lotes = data;
      this.lotes.forEach(lote => {
        this.aplicarFuncionSiEsFecha(lote);
      });
    });
  }

  lotesRutas(id: number) {
    this.service.lotesRutas(id).subscribe((data) => {
      this.lotes = data;
      this.lotes.forEach(lote => {  
        this.aplicarFuncionSiEsFecha(lote);
      });
    });
  }

  lotesDirlistaOrden(id: number) {
    this.service.lotesDirlistaOrden(id).subscribe((data) => {
      console.log(data)
      this.lotes = data;
      this.lotes.forEach(lote => {
        this.aplicarFuncionSiEsFecha(lote);
      });
    });
  }

  lotesProductos(id: number) {
    this.service.lotesProductos(id).subscribe((data) => {
      this.lotes = data;
      this.lotes.forEach(lote => {
        this.aplicarFuncionSiEsFecha(lote);
      });
    });
  }

  createLote(): void {
    this.router.navigate(["lotes/create"])
  }

  viewLote(id: number): void {
    this.router.navigate(["lotes/view/" + id])
  }

  updateLote(id: number): void {
    this.router.navigate(["lotes/update/" + id])
  }

  deleteLote(id: number): void {
    Swal.fire({
      title: 'Eliminar lote',
      text: '¿Está seguro que quiere eliminar este lote?',
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
            text: 'El lote ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#232323',
            background: '#1c1c1c',
            color: '#ffffff'
          });
          this.ngOnInit();
        });
      }
    });
    console.log('Eliminar lote con id:', id);
  }

  // Función que recibe un objeto y aplica una función si la propiedad es una fecha

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

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

  lotes: Lote[]
  constructor(private service:LoteService, 
    private router: Router,
     private activateRoute: ActivatedRoute  
  ){ 
    this.lotes = []
  }

  ngOnInit(): void {  
  switch (this.activateRoute.routeConfig?.path){

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

  list(){
    this.service.list().subscribe((data) => {
      this.lotes = data;
      }
    );
  }

  lotesRutas(id:number){
    this.service.lotesRutas(id).subscribe((data) => {
      this.lotes = data;
    });
  }

  lotesDirlistaOrden(id:number){ 
    this.service.lotesDirlistaOrden(id).subscribe((data) => {
      console.log(data)
      this.lotes = data;
    });
  }

  lotesProductos(id:number){
    this.service.lotesProductos(id).subscribe((data) => {
      this.lotes = data;
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
}

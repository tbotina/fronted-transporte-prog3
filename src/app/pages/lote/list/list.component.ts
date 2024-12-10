import { Component, OnInit } from '@angular/core';
import { LoteService } from 'src/app/services/lote.service';
import { Lote } from 'src/app/models/lote.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  lotes: Lote[]
  constructor(private service:LoteService, private router: Router) { 
    this.lotes = []
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe(data => {
      this.lotes = data;
      console.log(JSON.stringify(this.lotes))
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

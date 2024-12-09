import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  productos: Producto[]

  constructor(private service: ProductoService, private router: Router) {
    this.productos = []
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.productos = data;
      console.log(JSON.stringify(this.productos))
    });
  }

  createProduct(): void {
    this.router.navigate(["productos/create"])
  }

  viewProduct(id: number): void {
    this.router.navigate(["productos/view/" + id])
  }

  updateProduct(id: number): void {
    this.router.navigate(["productos/update/" + id])
  }

  deleteProduct(id: number): void {
    Swal.fire({
      title: 'Eliminar producto',
      text: '¿Está seguro que quiere eliminar este producto?',
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
            text: 'El producto ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#232323',
            background: '#1c1c1c',
            color: '#ffffff'
          });
          this.ngOnInit();
        });
      }
    });
    console.log('Eliminar producto con id:', id);
  }
}

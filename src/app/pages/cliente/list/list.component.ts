import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cliente: Cliente[]; // Array de cliente
  
  constructor(private service: ClienteService,
              private router:Router) { 
    this.cliente = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    // Llamada al Cliente para obtener la lista de cliente
    this.service.list().subscribe((data) => {
      this.cliente = data;
      }
    );
  }

  deletecliente(id: number): void {
    Swal.fire({
      title: 'Eliminar cliente',
      text: '¿Está seguro que quiere eliminar este cliente?',
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
            text: 'El cliente ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#232323', 
            background: '#1c1c1c', 
            color: '#ffffff' 
          });
          this.ngOnInit();
        });
      }
    });
    console.log('Eliminar cliente con id:', id);
  }

  viewcliente(id:number){
    this.router.navigate(["cliente/view/"+id])
    console.log('Visualizar a ', id)
  }

  updatecliente(id: number): void {
    this.router.navigate(["cliente/update/"+id])
    console.log('Actualizar cliente con id:', id);
  }

  createcliente(): void {
    this.router.navigate(["cliente/create"])
    console.log('Crear un nuevo cliente');
  }

}

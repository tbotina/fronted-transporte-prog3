import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/models/contrato.model';
import { ContratoService } from 'src/app/services/contrato/contrato.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  contratos: Contrato[]; // Array de contrato
  regexFecha = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:[0-9]{2}:00.000-[0123456789:]{5}$');
  
  constructor(private service: ContratoService,
              private router:Router) { 
    this.contratos = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    // Llamada al contrato para obtener la lista de contrato
    this.service.list().subscribe((data) => {
      this.contratos = data;
      this.contratos.forEach(element => {
        this.aplicarFuncionSiEsFecha(element);
      });
      }
    );
  }

  deleteContrato(id: number): void {
    Swal.fire({
      title: 'Eliminar contrato',
      text: '¿Está seguro que quiere eliminar este contrato?',
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
            text: 'El contrato ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#232323', 
            background: '#1c1c1c', 
            color: '#ffffff' 
          });
          this.ngOnInit();
        });
      }
    });
    console.log('Eliminar contrato con id:', id);
  }

  viewContrato(id:number){
    this.router.navigate(["contratos/view/"+id])
    console.log('Visualizar a ', id)
  }

  updateContrato(id: number): void {
    this.router.navigate(["contratos/update/"+id])
    console.log('Actualizar contrato con id:', id);
  }

  createContrato(): void {
    this.router.navigate(["contratos/create"])
    console.log('Crear un nuevo contrato');
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

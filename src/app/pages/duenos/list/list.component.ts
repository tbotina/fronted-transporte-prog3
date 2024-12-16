import { Component, OnInit } from '@angular/core';
import { Dueno } from 'src/app/models/dueno.model';
import { DuenoService } from 'src/app/services/dueno/dueno.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  duenos: Dueno[]; // Array de dueno

  regexFecha = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:00:00.000-[0123456789:]{5}$');

  constructor(private service: DuenoService,
    private router: Router) {
    this.duenos = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    // Llamada al dueno para obtener la lista de dueno
    this.service.list().subscribe((data) => {
      this.duenos = data;
      this.duenos.forEach(dueno => { 
        this.aplicarFuncionSiEsFecha(dueno);
      });
   });
    }

  deleteDueno(id: number): void {
      Swal.fire({
        title: 'Eliminar dueno',
        text: '¿Está seguro que quiere eliminar este dueno?',
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
              text: 'El dueno ha sido eliminado correctamente.',
              icon: 'success',
              confirmButtonColor: '#232323',
              background: '#1c1c1c',
              color: '#ffffff'
            });
            this.ngOnInit();
          });
        }
      });
      console.log('Eliminar dueno con id:', id);
    }

  viewDueno(id: number){
      this.router.navigate(["duenos/view/" + id])
    console.log('Visualizar a ', id)
    }

  updateDueno(id: number): void {
      this.router.navigate(["duenos/update/" + id])
    console.log('Actualizar dueno con id:', id);
    }

  createDueno(): void {
      this.router.navigate(["duenos/create"])
    console.log('Crear un nuevo dueno');
    }

    // Función para aplicar una función a un objeto si es una fecha

      aplicarFuncionSiEsFecha(obj: any) {
      for(let clave in obj) {
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

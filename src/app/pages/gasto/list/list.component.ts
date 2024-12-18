import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gasto } from 'src/app/models/gasto.model';
import { GastoService } from 'src/app/services/gasto/gasto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  mode: number;
  gastos: Gasto[];
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(private activateRoute: ActivatedRoute, private service: GastoService, private router: Router, private theFormBuilder: FormBuilder) { 
    this.trySend = false;
    this.mode = 1;
    this.gastos = [];
  }

  ngOnInit(): void {
    switch (this.activateRoute.routeConfig?.path){
      case 'list/:id/duenos':
        this.serviciosDuenos(this.activateRoute.snapshot.params.id);
        break;
      case 'list/:id/conductores':
        this.serviciosConductores(this.activateRoute.snapshot.params.id);
        break;
      case 'list':
        this.list();
        break;  
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.gastos = data;
      console.log(JSON.stringify(this.gastos));
    });
  }

  serviciosDuenos(id:number){
    this.service.serviciosDuenos(id).subscribe((data) => {
      this.gastos = data;
    });
  }

  serviciosConductores(id:number){ 
    this.service.serviciosConductores(id).subscribe((data) => {
      console.log(data)
      this.gastos = data;
    });
  }

  deleteGasto(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar este registro?',
      text: "No podrás recuperar este registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(data => {
          Swal.fire({
            title: 'Eliminado!',
            text: 'El gastos ha sido eliminado.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            background: '#1c1c1c',
            color: '#ffffff'
        })
        this.ngOnInit();
        });
      }
    });
    console.log('Eliminando gastos', id);
  }

  viewGasto(id: number): void {
    this.router.navigate(['gastoss/view/'+id]);
    console.log('Viendo gastos', id);
  }

  createGasto(): void {
    this.router.navigate(['gastoss/create']);
    console.log('Creando gastos', this.gastos);
  }

  updateGasto(id: number): void {
    this.router.navigate(['gastoss/update/'+id]);
    console.log('Actualizando gastos', id);
  }

}

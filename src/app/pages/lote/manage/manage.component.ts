import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lote } from 'src/app/models/lote.model';
import { LoteService } from 'src/app/services/lote.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1: view, 2: create, 3: update
  lote: Lote;
  theFormGroup: FormGroup;
  trySend: boolean;

  regexFecha = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:[0-9]{2}:00.000-[0123456789:]{5}$');

  constructor(private activateRoute: ActivatedRoute, private service: LoteService, private router: Router, private theFormBuilder: FormBuilder) {
    this.trySend = false;
    this.mode = 1;
    this.lote = { id: 0, cantidad_productos: 0, peso_total: 0, fecha_creacion: undefined, fecha_entrega: undefined, dir_lista_orden_id: 0, ruta_id: 0 };
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    }
    if (currentUrl.includes('create')) {
      this.mode = 2;
    } if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.lote.id = this.activateRoute.snapshot.params.id;
      this.getLote(this.lote.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      cantidad_productos: [null],
      peso_total: [null],
      fecha_creacion: [null],
      fecha_entrega: [null],
      dir_lista_orden_id: [null],
      ruta_id: [null]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  atras(){
    window.history.back();
  }

  getLote(id: number) {
    this.service.view(id).subscribe(data => {
      this.lote = data;
      this.aplicarFuncionSiEsFecha(this.lote); // Aplica la función si la propiedad es un objeto Date
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error")
      return
    }
    this.service.create(this.lote).subscribe(data => {
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success")
      this.router.navigate(["lotes/list"])
    })
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error")
      return
    }
    this.service.update(this.lote).subscribe(data => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success")
      this.router.navigate(["lotes/list"])
    })
  }

  volverLote(): void {
    this.router.navigate(["lotes/list"])
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

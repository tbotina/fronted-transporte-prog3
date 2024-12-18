import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrato } from 'src/app/models/contrato.model';
import { ContratoService } from 'src/app/services/contrato/contrato.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  contrato: Contrato;
  theFormGroup: FormGroup;
  trySend: boolean;

  regexFecha = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:00:00.000-[0123456789:]{5}$');

  constructor(private activateRoute: ActivatedRoute, private service: ContratoService, private router: Router, private theFormBuilder: FormBuilder) {
    this.trySend = false;
    this.mode = 1;
    this.contrato = { id: 0, fecha_creacion: "", cliente_id: 0 };
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    }
    if (currentUrl.includes('create')) {
      this.mode = 2;
    }
    if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.contrato.id = this.activateRoute.snapshot.params.id;
      this.getContrato(this.contrato.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      fecha_creacion: ['', [Validators.required]],
      cliente_id: ['', [Validators.required]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getContrato(id: number) {
    this.service.view(id).subscribe(data => {
      this.contrato = data;
      this.aplicarFuncionSiEsFecha(this.contrato);
      console.log(JSON.stringify(this.contrato));
      this.theFormGroup.patchValue(this.contrato); // Update form with the fetched data
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.create(this.contrato).subscribe(data => {
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
      this.router.navigate(["contratos/list"]);
    });
  }

  volverContrato(): void {
    this.router.navigate(["contratos/list"])
  }

  update() {
    console.log("Actualizando contrato", this.contrato);
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      console.log(this.contrato);
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.update(this.contrato).subscribe(data => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success");
      this.router.navigate(["contratos/list"]);
    });
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from 'process';
import { Ruta } from 'src/app/models/ruta.model';
import { RutaService } from 'src/app/services/ruta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1: view, 2: create, 3: update
  ruta: Ruta;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(private activateRoute: ActivatedRoute, private service: RutaService, private router: Router, private theFormBuilder: FormBuilder) {
    this.trySend = false;
    this.mode = 1;
    this.ruta = { id: 0, contrato_id: 0, vehiculo_id: 0, recorrido: false };
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
      this.ruta.id = this.activateRoute.snapshot.params.id;
      this.getRuta(this.ruta.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      vehiculo_id: [true, [Validators.required]],
      contrato_id: [true, [Validators.required]],
      recorrido: [false, [Validators.required]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  atras() {
    window.history.back();
  }

  getRuta(id: number) {
    this.service.view(id).subscribe(data => {
      this.ruta = data;
      this.theFormGroup.patchValue(this.ruta);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }

    // Asignar valores del formulario a la ruta
    this.ruta.vehiculo_id = this.theFormGroup.value.vehiculo_id;
    this.ruta.contrato_id = this.theFormGroup.value.contrato_id;

    console.log("Esta es una ruta", this.ruta);

    this.service.create(this.ruta).subscribe({
      next: (data) => {
        Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
        this.router.navigate(["rutas/list"]);
      },
      error: (err) => {
        console.error("Error al crear la ruta:", err);
        Swal.fire("Error", "No se pudo crear el registro", "error");
      }
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }

    this.ruta.vehiculo_id = this.theFormGroup.value.vehiculo_id;
    this.ruta.contrato_id = this.theFormGroup.value.contrato_id;

    console.log("Actualización de ruta", this.ruta);

    this.service.update(this.ruta).subscribe(data => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success");
      this.router.navigate(["rutas/list"]);
    });
  }

  volverRuta(): void {
    this.router.navigate(["rutas/list"])
  }

}



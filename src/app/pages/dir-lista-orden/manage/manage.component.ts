import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DirListaOrden } from 'src/app/models/dir-lista-orden.model';
import { DirListaOrdenService } from 'src/app/services/dir-lista-orden.service';
import { DirlistaordenService } from 'src/app/services/dirlistaorden.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1: view, 2: create, 3: update
  dirlistaorden: DirListaOrden;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(private activateRoute: ActivatedRoute, private service: DirListaOrdenService, private router: Router, private theFormBuilder: FormBuilder) {
    this.trySend = false;
    this.mode = 1;
    this.dirlistaorden = { id: 0, orden: 0, ruta_id: 0, direccion_id: 0 };
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
      this.dirlistaorden.id = this.activateRoute.snapshot.params.id;
      this.getDirlistaorden(this.dirlistaorden.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      orden: [true, [Validators.required]],
      ruta_id: [true, [Validators.required]],
      direccion_id: [true, [Validators.required]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getDirlistaorden(id: number) {
    this.service.view(id).subscribe(data => {
      this.dirlistaorden = data;
      this.theFormGroup.patchValue(this.dirlistaorden);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error")
      return
    }
    this.service.create(this.dirlistaorden).subscribe({
      next: (data) => {
        Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
        this.router.navigate(["dirlistaordens/list"]);
      },
      error: (err) => {
        console.error("Error al crear la dirlistaorden:", err);
        Swal.fire("Error", "No se pudo crear el registro", "error");
      }
    })
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error")
      return
    }
    this.service.update(this.dirlistaorden).subscribe(data => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success")
      console.log("Actualización de dirlistaorden", this.dirlistaorden)
      this.router.navigate(["dirlistaordenes/list"])
    })
  }

  volverDirlistaorden(): void {
    this.router.navigate(["dirlistaordenes/list"])
  }

}

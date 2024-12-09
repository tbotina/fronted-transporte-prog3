import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  vehiculo: Vehiculo;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(private activateRoute: ActivatedRoute, private service: VehiculoService, private router: Router, private theFormBuilder: FormBuilder) {
    this.trySend = false;
    this.mode = 1;
    this.vehiculo = { id: 0, placa: "", municipio_id: 0, tipo_vehiculo: "" };
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
      this.vehiculo.id = this.activateRoute.snapshot.params.id;
      this.getVehiculo(this.vehiculo.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      placa: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
      municipio_id:[true, [ Validators.required]],
      tipo_vehiculo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getVehiculo(id: number) {
    this.service.view(id).subscribe(data => {
      this.vehiculo = data;
      console.log(JSON.stringify(this.vehiculo));
      this.theFormGroup.patchValue(this.vehiculo); // Update form with the fetched data
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.create(this.vehiculo).subscribe(data => {
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
      this.router.navigate(["vehiculo/list"]);
    });
  }
  
  volverVehiculo(): void {
    this.router.navigate(["vehiculo/list"])
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.update(this.vehiculo).subscribe(data => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success");
      this.router.navigate(["vehiculo/list"]);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gasto } from 'src/app/models/gasto.model';
import { GastoService } from 'src/app/services/gasto/gasto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number;
  gasto: Gasto;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(private activateRoute: ActivatedRoute, private service: GastoService, private router: Router, private theFormBuilder: FormBuilder) { 
    this.trySend = false;
    this.mode = 1;
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
      this.gasto.id = this.activateRoute.snapshot.params.id;
      this.getGasto(this.gasto.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      cantidad: [null],
      dueño_id: [true, [ Validators.required]],
      conductor_id: [true, [ Validators.required]],
      servicio_id: [true, [ Validators.required]],
      factura_id: [true, [ Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getGasto(id: number) {
    this.service.view(id).subscribe(data => {
      this.gasto = data;
    });
  }

  atras() {
    window.history.back();
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error', 'Por favor complete los campos requeridos', 'error');
      return;
    }
    this.service.create(this.theFormGroup.value).subscribe(data => {
      Swal.fire('Gasto creado', 'Gasto creado correctamente', 'success');
      this.router.navigate(['/gastos/list']);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error', 'Por favor complete los campos requeridos', 'error');
      return;
    }
    this.service.update(this.gasto).subscribe(data => {
      Swal.fire('Gasto actualizado', 'Gasto actualizado correctamente', 'success');
      this.router.navigate(['/gastos/list']);
    });
  }

  volverGasto(): void {
    this.router.navigate(['/gastos/list']);
  }

}

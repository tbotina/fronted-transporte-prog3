import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuota } from 'src/app/models/cuota.model';
import { CuotaService } from 'src/app/services/cuota/cuota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number;
  cuota: Cuota;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(private activateRoute: ActivatedRoute, private service: CuotaService, private router: Router, private theFormBuilder: FormBuilder) {
    this.trySend = false;
    this.mode = 1;
    this.cuota = { id: 0, valor: 0, estado: false, contrato_id: 0 };
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
      this.cuota.id = this.activateRoute.snapshot.params.id;
      this.getCuota(this.cuota.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      valor: [0, [Validators.required]],
      estado: [false, [ Validators.required]],
      contrato_id: [true, [Validators.required]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  atras() {
    window.history.back();
  }

  getCuota(id: number) {
    this.service.view(id).subscribe((data) => {
      this.cuota = data;
      console.log(JSON.stringify(this.cuota));
      this.theFormGroup.patchValue(this.cuota);
    });
  }

  create() {
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Error', 'Por favor, llena el formulario correctamente', 'error');
      return;
    }
    this.service.create(this.cuota).subscribe((data) => {
      Swal.fire('Guardado', 'Cuota guardada correctamente', 'success');
      this.router.navigate(['cuotas/list']);
    });
  }

  volverCuota(): void {
    this.router.navigate(['cuotas/list']);
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.update(this.cuota).subscribe(data => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success");
      this.router.navigate(["cuotas/list"]);
    });
  }

  pay(){
      this.router.navigate(["/pagos/cuota/", this.cuota.id]);
  }

}

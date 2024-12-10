import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dueno } from 'src/app/models/dueno.model';
import { DuenoService } from 'src/app/services/dueno/dueno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  dueno: Dueno;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(private activateRoute: ActivatedRoute, private service: DuenoService, private router: Router, private theFormBuilder: FormBuilder) {
    this.trySend = false;
    this.mode = 1;
    this.dueno = { 
      id: 0, 
      nombre: "", 
      //email: "", 
      fecha_nacimiento: new Date(), 
      cedula: "", 
      security_id: "", 
      vehiculos: [] 
  }; // Se inicializa el objeto dueno con los atributos correctos
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
      this.dueno.id = this.activateRoute.snapshot.params.id;
      this.getDueno(this.dueno.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      //email: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: ['', [Validators.required]],
      cedula: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      security_id: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      vehiculo: [null, []]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getDueno(id: number) {
    this.service.view(id).subscribe(data => {
      this.dueno = data;
      console.log(JSON.stringify(this.dueno));
      this.theFormGroup.patchValue(this.dueno); // Update form with the fetched data
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.create(this.dueno).subscribe(data => {
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
      this.router.navigate(["dueno/list"]);
    });
  }
  
  volverDueno(): void {
    this.router.navigate(["duenos/list"])
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.update(this.dueno).subscribe(data => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success");
      this.router.navigate(["dueno/list"]);
    });
  }
}
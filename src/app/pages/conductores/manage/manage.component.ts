import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Conductor } from 'src/app/models/conductor.model';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  conductor: Conductor;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(private activateRoute: ActivatedRoute, private service: ConductorService, private router: Router, private theFormBuilder: FormBuilder) {
    this.trySend = false;
    this.mode = 1;
    this.conductor = { 
      id: 0, 
      nombre: "", 
      //email: "", 
      fecha_nacimiento: new Date(""), 
      cedula: "", 
      security_id: "", 
      vehiculo:null 
  }; // Se inicializa el objeto conductor con los atributos correctos
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
      this.conductor.id = this.activateRoute.snapshot.params.id;
      this.getConductor(this.conductor.id);
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

  getConductor(id: number) {
    this.service.view(id).subscribe(data => {
      this.conductor = data;
      console.log(JSON.stringify(this.conductor));
      this.theFormGroup.patchValue(this.conductor); // Update form with the fetched data
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.create(this.conductor).subscribe(data => {
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
      this.router.navigate(["conductor/list"]);
    });
  }
  
  volverConductor(): void {
    this.router.navigate(["conductors/list"])
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.update(this.conductor).subscribe(data => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success");
      this.router.navigate(["conductor/list"]);
    });
  }
}

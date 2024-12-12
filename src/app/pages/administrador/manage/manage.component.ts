import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador.model';
import { AdministradorService } from 'src/app/services/administrador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  administrador: Administrador;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: AdministradorService,
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.administrador = {
      _id: "",
      nombre: "",
      email: "",
      password: "",
      role: "",
      cedula: "",
      fecha_nacimiento: new Date(),
      security_id: ""
    };
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
      this.administrador._id = this.activateRoute.snapshot.params.id;
      this.getAdministrador(this.administrador._id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      role: ['', [Validators.maxLength(20)]],
      cedula: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      fecha_nacimiento: ['', [Validators.required]],
      security_id: ['', [Validators.maxLength(50)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getAdministrador(_id: string) {
    this.service.view(_id).subscribe(data => {
      this.administrador = data;
    });
  }  

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.create(this.administrador).subscribe(() => {
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
      this.router.navigate(["administrador/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.update(this.administrador).subscribe(() => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success");
      this.router.navigate(["administrador/list"]);
    });
  }
}
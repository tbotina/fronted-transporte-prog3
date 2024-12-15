import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  cliente: Cliente;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: ClienteService,
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.cliente = {
      id: 0,
      nombre: "",
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
      this.cliente.id = +this.activateRoute.snapshot.params.id;
      this.getCliente(this.cliente.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      cedula: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      fecha_nacimiento: ['', [Validators.required]],
      security_id: ['', [Validators.maxLength(50)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getCliente(id: number) {
    this.service.view(id).subscribe(data => {
      this.cliente = data;
    });
  }  

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.create(this.cliente).subscribe(() => {
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
      this.router.navigate(["cliente/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.update(this.cliente).subscribe(() => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success");
      this.router.navigate(["cliente/list"]);
    });
  }
}

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

  regexFecha = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:00:00.000-[0123456789:]{5}$');


  constructor(private activateRoute: ActivatedRoute, private service: ConductorService, private router: Router, private theFormBuilder: FormBuilder) {
    this.trySend = false;
    this.mode = 1;
    this.conductor = {
      id: 0,
      nombre: "",
      //email: "", 
      fecha_nacimiento: "",
      cedula: "",
      security_id: "",
      vehiculos: []
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

  atras(){
    window.history.back();
  }

  getConductor(id: number) {
    this.service.view(id).subscribe(data => {
      this.conductor = data;
      this.aplicarFuncionSiEsFecha(this.conductor);
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
    this.router.navigate(["conductores/list"])
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

  // Función para aplicar una función a un objeto si es una fecha

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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaNatural } from 'src/app/models/persona-natural.model';
import { PersonaNaturalService } from 'src/app/services/persona-natural.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  personaNatural: PersonaNatural
  theFormGroup: FormGroup
  trySend: boolean

  regexFecha = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:00:00.000-[0-9:]{5}$')

  constructor(private activateRoute: ActivatedRoute, private service: PersonaNaturalService, private router: Router, private theFormBuilder: FormBuilder) {
    this.trySend = false
    this.mode = 1;
    this.personaNatural = { id: 0, nombre: "", cedula: "", security_id: "", cliente_id: 0, empresa_id: 0, fecha_nacimiento: "" }
  }

  ngOnInit(): void {
    this.configFormGroup()
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
      this.personaNatural.id = this.activateRoute.snapshot.params.id
      this.getPersonaNatural(this.personaNatural.id)
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [0],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      cedula: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      fecha_nacimiento: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      security_id: [null, Validators.required],
      cliente_id: [null, Validators.required],
      empresa_id: [null, Validators.required]
    })
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  atras(){
    window.history.back();
  }

  getPersonaNatural(id: number) {
    this.service.view(id).subscribe(data => {
      this.personaNatural = data
      this.aplicarFuncionSiEsFecha(this.personaNatural);
      this.theFormGroup.patchValue(this.personaNatural); // Update form with the fetched data
    })
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error")
      return
    }
    this.service.create(this.personaNatural).subscribe(data => {
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success")
      this.atras()
    })
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error")
      return
    }
    this.service.update(this.personaNatural).subscribe(data => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success")
      this.atras()
    })
  }

  volverProducto(): void {
    this.atras()
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

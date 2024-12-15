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
  personaNatural: PersonaNatural;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: PersonaNaturalService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.personaNatural = {
      _id: undefined,
      nombre: '',
      fecha_nacimiento: new Date(),
      cedula: '',
      cliente_id: 0
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
      this.personaNatural._id = +this.activateRoute.snapshot.params.id;
      this.getPersonaNatural(this.personaNatural._id);
    }
  }

  configFormGroup(): void {
    this.theFormGroup = this.theFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      fecha_nacimiento: ['', Validators.required],
      cliente_id: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getPersonaNatural(id: number): void {
    this.service.view(id).subscribe(data => {
      this.personaNatural = data;
      console.log(JSON.stringify(this.personaNatural));
    });
  }

  create(): void {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingrese correctamente los datos solicitados', 'error');
      return;
    }
    this.service.create(this.personaNatural).subscribe(data => {
      Swal.fire('Creación Exitosa', 'Se ha creado un nuevo registro', 'success');
      this.router.navigate(['persona-natural/list']);
    });
  }

  update(): void {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Ingrese correctamente los datos solicitados', 'error');
      return;
    }
    this.service.update(this.personaNatural).subscribe(data => {
      Swal.fire('Actualización Exitosa', 'Se ha actualizado el registro', 'success');
      this.router.navigate(['persona-natural/list']);
    });
  }
}

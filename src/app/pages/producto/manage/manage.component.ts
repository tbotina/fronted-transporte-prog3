import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  producto: Producto
  theFormGroup: FormGroup
  trySend: boolean

  constructor(private activateRoute: ActivatedRoute, private service: ProductoService, private router: Router, private theFormBuilder: FormBuilder) {
    this.trySend = false
    this.mode = 1;
    this.producto = { id: 0, nombre: "", cliente_id: 0, lote_id: 0 }
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
      this.producto.id = this.activateRoute.snapshot.params.id
      this.getProducto(this.producto.id)
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      cliente_id: [null, Validators.required],
      lote_id: [null, Validators.required]
      // idCiudad: [null, Validators.required]
    })
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  // getTheaterData(){
  //   this.theater.capacity=this.getTheFormGroup.capacity.value
  //   this.theater.location=this.getTheFormGroup.location.value
  // }

  getProducto(id: number) {
    this.service.view(id).subscribe(data => {
      this.producto = data
      console.log(JSON.stringify(this.producto));
    })
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error")
      return
    }
    this.service.create(this.producto).subscribe(data => {
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success")
      this.router.navigate(["productos/list"])
    })
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error")
      return
    }
    this.service.update(this.producto).subscribe(data => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success")
      this.router.navigate(["productos/list"])
    })
  }

  volverProducto(): void {
    this.router.navigate(["productos/list"])
  }
}

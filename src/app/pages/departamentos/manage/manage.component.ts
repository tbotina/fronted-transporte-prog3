import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamentos } from 'src/app/models/departamentos';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number;
  departamento:Departamentos
  theFormGroup:FormGroup
  trySend:boolean

  constructor(private activateRoute:ActivatedRoute, private service: DepartamentosService,private router:Router, private theFormBuilder: FormBuilder) {
    this.trySend=false
    this.mode=1;
    this.departamento={id:0,nombre:""}
   }

  ngOnInit(): void {
    this.configFormGroup()
    const currentUrl= this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode=1;
    }
    if (currentUrl.includes('create')) {
      this.mode=2;
    } if (currentUrl.includes('update')) {
      this.mode=3;
    } 
    if(this.activateRoute.snapshot.params.id){
      this.departamento.id=this.activateRoute.snapshot.params.id
      this.getDepartamento(this.departamento.id)
    }
  
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      nombre:['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      idCiudad:[null,Validators.required]
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }
  // getTheaterData(){
  //   this.theater.capacity=this.getTheFormGroup.capacity.value
  //   this.theater.location=this.getTheFormGroup.location.value
  // }
  getDepartamento(id:number){
    this.service.view(id).subscribe(data=>{
      this.departamento=data
      console.log(JSON.stringify(this.departamento));
      

    })
    
  }  

  create(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.create(this.departamento).subscribe(data=>{
      Swal.fire("Creación Exitosa","Se ha creado un nuevo registro","success")
      this.router.navigate(["departamentos/list"])
    })
  }
  update(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.update(this.departamento).subscribe(data=>{
      Swal.fire("Actualización Exitosa","Se ha actualizado el registro","success")
      this.router.navigate(["departamentos/list"])
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Conductor } from 'src/app/models/conductor.model';
import { Dueno } from 'src/app/models/dueno.model';
import { Ruta } from 'src/app/models/ruta.model';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { DuenoService } from 'src/app/services/dueno/dueno.service';
import { RutaService } from 'src/app/services/ruta/ruta.service';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})

export class ManageComponent implements OnInit {

  mode: number;
  vehiculo: Vehiculo;
  theFormGroup: FormGroup;
  trySend: boolean;


  constructor(private activateRoute: ActivatedRoute, 
    private service: VehiculoService, 
    private router: Router, 
    private theFormBuilder: FormBuilder,
    private ConductoresService: ConductorService,
    private DuenosService: DuenoService,
    private RutasService: RutaService) {

    this.trySend = false;
    this.mode = 1;
    this.vehiculo = { id: 0, placa: "", municipio_id: 0, tipo_vehiculo: "" , conductores: [], duenos: [], rutas: [] };
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
      this.vehiculo.id = this.activateRoute.snapshot.params.id;
      this.conductoresVehiculos(this.vehiculo.id);
      this.getVehiculo(this.vehiculo.id);
    }

    this.cargarRelaciones(); // Cargar las relaciones

  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      placa: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
      municipio_id: [true, [Validators.required]],
      tipo_vehiculo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  atras() {
    window.history.back();
  }

  getVehiculo(id: number) {
    this.service.view(id).subscribe(data => {
      this.vehiculo = data;
      console.log(JSON.stringify(this.vehiculo));
      this.theFormGroup.patchValue(this.vehiculo); // Update form with the fetched data
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.create(this.vehiculo).subscribe(data => {
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
      this.router.navigate(["vehiculos/list"]);
    });
  }

  volverVehiculo(): void {
    this.router.navigate(["vehiculos/list"])
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.update(this.vehiculo).subscribe(data => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success");
      this.router.navigate(["vehiculo/list"]);
    });
  }


  // Tablas con las que se relaciona --------------------------------------------------------------------------------

  listConductores: Conductor[]; // la lista de conductores
  listDuenos: Dueno[]; // la lista de duenos
  listRutas: Ruta[]; // la lista de rutas

  cargarRelaciones() { // Cargar las relaciones
    this.getConductores();
    this.getDuenos();
    this.getRutas();
  }

  getConductores() {
    this.ConductoresService.list().subscribe(data => {
      this.listConductores = data;
    });
  }

  getDuenos() {
    this.DuenosService.list().subscribe(data => {
      this.listDuenos = data;
    });
  }

  getRutas() {
    this.RutasService.list().subscribe(data => {
      this.listRutas = data;
    });
  }

  // Relaciones reales

  conductoresVehiculos(id: number) {
    this.ConductoresService.conductoresVehiculos(id).subscribe(data => {
      this.vehiculo.conductores = data;
    });
  }

  duenosVehiculos(id: number) {
    this.DuenosService.duenosVehiculos(id).subscribe(data => {
      this.vehiculo.duenos = data;
    });
  }

  rutasVehiculos(id: number) {
    this.RutasService.rutasVehiculos(id).subscribe(data => {
      this.vehiculo.rutas = data;
    });
  }


  // Manejar la selección/deselección de conductores
  onCheckboxChange(conductor: Conductor, event: any): void {
    if (event.target.checked) {
      this.vehiculo.conductores.push(conductor); // Agregar a la lista
    } else {
      this.vehiculo.conductores = this.vehiculo.conductores.filter(conductorId => conductorId !== conductor); // Eliminar ID
    }
  }

  isConductorSelected(id): boolean {
    this.vehiculo.conductores.forEach(element => {
      if (element.id === id) {
        console.log(id + " " + element.id);
        return true;
      }
    });
    return false;
  }

}

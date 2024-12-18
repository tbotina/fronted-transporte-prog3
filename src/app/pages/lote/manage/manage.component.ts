import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoteService } from 'src/app/services/lote.service';
import { Lote } from 'src/app/models/lote.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  mode: number = 1; // 1: View, 2: Create, 3: Update
  lote: Lote;
  theFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: LoteService,
    private router: Router
  ) {
    this.lote = {
      id: 0,
      cantidad_productos: 0,
      peso_total: 0,
      fecha_creacion: null,
      fecha_entrega: null,
      dir_lista_orden_id: 0,
      ruta_id: 0,
    };
  }

  ngOnInit(): void {
    this.initForm();
    this.detectMode();
  }

  initForm() {
    this.theFormGroup = this.fb.group({
      cantidad_productos: [null, [Validators.required, Validators.min(1)]],
      peso_total: [null, [Validators.required, Validators.min(0.1)]],
      fecha_creacion: [null, [Validators.required]],
      fecha_entrega: [null, [Validators.required]],
      dir_lista_orden_id: [null, [Validators.required]],
      ruta_id: [null, [Validators.required]],
    });
  }

  detectMode() {
    const url = this.route.snapshot.url.join('/');
    if (url.includes('view')) this.mode = 1;
    if (url.includes('create')) this.mode = 2;
    if (url.includes('update')) {
      this.mode = 3;
      const id = this.route.snapshot.params['id'];
      this.loadLote(id);
    }
  }

  loadLote(id: number) {
    this.service.view(id).subscribe({
      next: (data) => {
        console.log(data);

        this.lote = {
          ...data,
          fecha_creacion: new Date(data.fecha_creacion),
          fecha_entrega: new Date(data.fecha_entrega),
        };
        this.theFormGroup.patchValue(this.lote);
      },
      error: () => Swal.fire('Error', 'No se pudo cargar el lote', 'error'),
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Complete todos los campos correctamente', 'error');
      return;
    }
    console.log(this.theFormGroup.invalid)
  
    this.service.create(this.theFormGroup.value).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Lote creado correctamente', 'success');
        this.router.navigate(['/lotes/list']);
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudo crear el lote', 'error');
        console.error('Error al crear el lote:', error);
      }
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Complete todos los campos correctamente', 'error');
      return;
    }
    this.service.update({ ...this.lote, ...this.theFormGroup.value }).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Lote actualizado correctamente', 'success');
        this.router.navigate(['/lotes/list']);
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudo actualizar el lote', 'error');
        console.error('Error al actualizar el lote:', error);
      }
    });
  }

  volverLote() {
    this.router.navigate(['/lotes/list']);
  }
}

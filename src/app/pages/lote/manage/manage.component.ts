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

  regexFecha = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:00:00.000-[0123456789:]{5}$');

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
      dir_lista_orden_id: [null],
      ruta_id: [null],
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
    this.service.create(this.theFormGroup.value).subscribe(() => {
      Swal.fire('Éxito', 'Lote creado correctamente', 'success');
      this.router.navigate(['/lotes/list']);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Complete todos los campos correctamente', 'error');
      return;
    }
    this.service.update({ ...this.lote, ...this.theFormGroup.value }).subscribe(
      () => {
        Swal.fire('Éxito', 'Lote actualizado correctamente', 'success');
        this.router.navigate(['/lotes/list']);
      }
    );
  }

  volverLote() {
    this.router.navigate(['/lotes/list']);
  }

  // Función que recibe un objeto y aplica una función si la propiedad es una fecha

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

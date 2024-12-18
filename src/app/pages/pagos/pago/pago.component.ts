import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pago } from 'src/app/models/pago.modelo';
import { CuotaService } from 'src/app/services/cuota/cuota.service';
import { PagoService } from 'src/app/services/pago/pago.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit {

  theFormGroup: FormGroup;
  pago: Pago;

  constructor(
    private theFormBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private cuotaService: CuotaService,
    private pagoService: PagoService
  ) {
    this.pago = {
      card_number: "",
      exp_year: 0,
      exp_month: 0,
      cvc: 0,
      name: "",
      last_name: "",
      bill: "",
      value: 0,
      phone: "31231231231",
      doc_number: "31231231231",
      city: "Manizales",
      address: "Universidad de Caldas",
      cell_phone: "3127142928",
      email: "uzumakyinuyasha@gmail.com"
    };
  }


  ngOnInit(): void {
    this.configFormGroup();

    if (this.activateRoute.snapshot.params.id) {
      this.pago.bill = "cuota_" + this.activateRoute.snapshot.params.id;
    }

    this.cuotaService.view(this.activateRoute.snapshot.params.id).subscribe(
      (data) => {
        this.pago.value = data.valor;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  configFormGroup(): void {
    this.theFormGroup = this.theFormBuilder.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      card_number: ['', [Validators.required]],
      exp_year: ['', [Validators.required]],
      exp_month: ['', [Validators.required]],
      cvc: ['', [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  atras(): void {
    window.history.back();
  }

  pagar(): void {
    if (this.theFormGroup.valid) {
      // Actualiza el objeto pago con los valores del formulario
      this.pago = { ...this.pago, ...this.theFormGroup.value }; // Asegúrate de incluir todos los campos necesarios
  
      console.log('Formulario válido:', this.pago); // Cambia esto para mostrar el objeto pago actualizado
  
      this.pagoService.create(this.pago).subscribe(
        (data) => {
          console.log(data);
          alert('Pago realizado con éxito');
        },
        (error) => {
          console.error(error);
          alert('Error al realizar el pago');
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
  
}

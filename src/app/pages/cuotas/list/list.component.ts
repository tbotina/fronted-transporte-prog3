import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuota } from 'src/app/models/cuota.model';
import { CuotaService } from 'src/app/services/cuota/cuota.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cuotas: Cuota[];
  
  constructor( private service: CuotaService, private router: Router, private activateRoute: ActivatedRoute  ) { 
    this.cuotas = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data) => {
      this.cuotas = data;
      }
    );
  }

  createCuota(){
    this.router.navigate(["/cuotas/create"]);
    console.log('Crear una nueva cuota');
  }

  viewCuota(id: number){
    this.router.navigate(["/cuotas/view/", id]);
    console.log('Ver cuota: ', id);
  }

  updateCuota(id: number){
    this.router.navigate(["/cuotas/update/", id]);
    console.log('Actualizar cuota: ', id);
  }

}

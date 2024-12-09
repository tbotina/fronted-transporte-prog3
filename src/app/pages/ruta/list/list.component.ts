import { Component, OnInit } from '@angular/core';
import { RutaModule } from '../ruta.module';
import { RutaService } from 'src/app/services/ruta.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  rutas: RutaModule[]
  constructor(private service:RutaService) { 
    this.rutas = []
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe(data => {
      this.rutas = data;
      console.log(JSON.stringify(this.rutas))
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { DirListaOrden } from 'src/app/models/dir-lista-orden.model';
import { DirListaOrdenService } from 'src/app/services/dir-lista-orden.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dirListaOrdenes: DirListaOrden[]

  constructor(private service:DirListaOrdenService) {
    this.dirListaOrdenes = []
   }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe(data => {
      this.dirListaOrdenes = data;
      console.log(JSON.stringify(this.dirListaOrdenes))
    });
  }
}

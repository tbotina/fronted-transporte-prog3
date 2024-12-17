import { Component, OnInit } from '@angular/core';
import { DirListaOrdenService } from 'src/app/services/dir-lista-orden.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private service: DirListaOrdenService) { }

  ngOnInit(): void {
  }

}

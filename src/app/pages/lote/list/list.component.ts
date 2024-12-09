import { Component, OnInit } from '@angular/core';
import { LoteModule } from '../lote.module';
import { LoteService } from 'src/app/services/lote.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  lotes: LoteModule[]
  constructor(private service:LoteService) { 
    this.lotes = []
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe(data => {
      this.lotes = data;
      console.log(JSON.stringify(this.lotes))
    });
  }
}

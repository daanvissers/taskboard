import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sprint-edit',
  templateUrl: './sprint-edit.component.html',
  styleUrls: ['./sprint-edit.component.css']
})
export class SprintEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  edit() {
    // TODO: Maak hier een functie die de SprintService aanroept,
    // en de properties van een bepaalde Sprint update.
    // Precies net zoals de Project Edit.
    // Je kan `this.data.id` gebruiken, wat de id is van de
    // sprint die je aan het editen bent
  }

}

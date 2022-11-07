//npm install
//ng add @angular/material

import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Observable, ObservableInput } from 'rxjs';

interface IToDo {
  assigendTo: string,
  description: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo-list';
  inputAssignedTo:string = "";
  inputDescription:string = "";

  currentToDo: IToDo[] = [];
  doneToDos: IToDo[] = [];

  displayedColumnsOfToDos: string[] = ['assigendTo', 'description', 'doneButton'];
  displayedColumnsOfHistory: string[] = ['assigendTo', 'description', 'deleteButton'];

  @ViewChild("todoTable") todoTable! : MatTable<IToDo>;
  @ViewChild("doneTodoTable") doneTodoTable! : MatTable<IToDo>;

  constructor() { }
  ngOnInit(): void {
    let toDo:IToDo = {assigendTo:"first", description: "first description"};
    this.currentToDo.push(toDo);
    toDo = {assigendTo:"second", description: "second description"}
    this.currentToDo.push(toDo);

    toDo = {assigendTo:"third", description: "third description"}
    this.doneToDos.push(toDo);
  }
  
  addToDo() {
    if (this.inputAssignedTo != "" || this.inputDescription != "") {

      let toDo: IToDo = {assigendTo: this.inputAssignedTo, description: this.inputDescription };
      this.currentToDo.push(toDo);
      console.log(this.currentToDo);
      this.todoTable.renderRows();

    }else {
      console.error("Inalid input");
    }    
  }
  doneToDo(index:number){

    let toDo:IToDo = this.currentToDo[index];

    this.currentToDo.splice(index,1);
    this.doneToDos.push(toDo);

    this.doneTodoTable.renderRows();
    this.todoTable.renderRows();

    console.log(this.doneToDos);
  }
  deleteToDo(index:number){
    
    this.doneToDos.splice(index,1);
    this.doneTodoTable.renderRows();
  }

}


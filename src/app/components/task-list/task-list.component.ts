import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
@Input() taskList: any[]=[];
@Output() important = new EventEmitter<any>();
@Output() complete = new EventEmitter<any>();
@Output() unimportant = new EventEmitter<any>();
@Output() uncomplete = new EventEmitter<any>();
@Output() delete = new EventEmitter<any>();

markImportant(task:any){
  this.important.emit(task);
}
markComplete(task:any){
  this.complete.emit(task);
}

markUnimportant(task:any){
  this.unimportant.emit(task);
}

markUncomplete(task:any){
  this.uncomplete.emit(task);
}

onDelete(task:any ){
  this.delete.emit(task);
  
}

}

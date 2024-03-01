import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DatePipe } from '@angular/common';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, DatePipe, PageTitleComponent, TaskListComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.css',
})
export class AllTaskComponent {
  search($event: Event) {
    throw new Error('Method not implemented.');
  }
  newTask="";
  initialtaskList:any[]=[];
  taskList:any[]=[];
  httpService=inject(HttpService);
  stateService=inject(StateService);
  
  ngOnInit(){
    this.stateService.searchSubject.subscribe((value)=>{
      if(value){
        this.taskList = this.initialtaskList.filter((x) => x.title.toLowerCase().includes(value.toLowerCase()))

      } else{
        this.taskList=this.initialtaskList;
      }
    });
    this.getAllTask();
  }

  addTask() {
    console.log("addTask",this.newTask)
    this.httpService.addTask(this.newTask).subscribe(() => {
      this.newTask="";
      this.getAllTask();
    })
  }
  getAllTask() {
    this.httpService.getAllTask().subscribe((result: any)=> {

      this.initialtaskList = this.taskList =result;
    })
  }

  onComplete(task:any){
    task.completed=true;
    console.log('complete',task)
    this.httpService.updateTask(task).subscribe(()=>{
      this.getAllTask();
    })
  }

  onImportant(task:any){
    task.important=true;
    this.httpService.updateTask(task).subscribe(()=>{
      this.getAllTask();
    })
  }

  onUnimportant(task: any) {
    task.important = false;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTask();
    });
  }

  onUncomplete(task:any){
    task.completed=false;
    console.log('complete',task)
    this.httpService.updateTask(task).subscribe(()=>{
      this.getAllTask();
    })
  }

  onDelete(task: any) {
    this.httpService.deleteTask(task).subscribe(() => {
      this.getAllTask();
    });
  }
}

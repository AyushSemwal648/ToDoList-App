import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../services/http.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-important-tasks',
  standalone: true,
  imports: [PageTitleComponent,TaskListComponent],
  templateUrl: './important-tasks.component.html',
  styleUrl: './important-tasks.component.css'
})
export class ImportantTasksComponent {
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

      this.initialtaskList = this.taskList =result.filter((x:any)=>x.important==true);
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

import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';
import { FormsModule } from '@angular/forms';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [TaskItemComponent, FormsModule, DragDropModule],
})
export class TodoComponent {
  tasks: Task[] = [];
  newTask: string = '';

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  addTask(): void {
    if (this.newTask.trim()) {
      this.taskService.addTask(this.newTask.trim());
      this.newTask = '';
      this.tasks = this.taskService.getTasks();
    }
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  toggleTask(id: number): void {
    this.taskService.toggleTaskCompletion(id);
    this.tasks = this.taskService.getTasks();
  }

  editTask({ id, title }: { id: number; title: string }): void {
    this.taskService.updateTask(id, title);
    this.tasks = this.taskService.getTasks();
  }

  drop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  public get completedTasksCount(): number {
    return this.tasks.filter((task) => task.isCompleted).length;
  }

  public get incompleteTasksCount(): number {
    return this.tasks.filter((task) => !task.isCompleted).length;
  }
}

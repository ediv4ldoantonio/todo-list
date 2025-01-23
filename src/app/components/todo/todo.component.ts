import { Component, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';
import { FormsModule } from '@angular/forms';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

/**
 * Componente que representa a lista de tarefas.
 *
 * @selector 'app-todo'
 * @templateUrl './todo.component.html'
 * @styleUrls ['./todo.component.css']
 * @standalone true
 * @encapsulation ViewEncapsulation.None
 */
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [TaskItemComponent, FormsModule, DragDropModule],
  encapsulation: ViewEncapsulation.None,
})
export class TodoComponent {
  tasks: Task[] = [];
  newTask: string = '';

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  /**
   * Adiciona uma nova tarefa.
   */
  addTask(): void {
    if (this.newTask.trim()) {
      this.taskService.addTask(this.newTask.trim());
      this.newTask = '';
      this.tasks = this.taskService.getTasks();
    }
  }

  /**
   * Deleta uma tarefa pelo ID.
   * @param id - ID da tarefa a ser deletada.
   */
  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  /**
   * Alterna o estado de conclusão de uma tarefa pelo ID.
   * @param id - ID da tarefa a ser alternada.
   */
  toggleTask(id: number): void {
    this.taskService.toggleTaskCompletion(id);
    this.tasks = this.taskService.getTasks();
  }

  /**
   * Edita uma tarefa pelo ID e novo título.
   * @param param0 - Objeto contendo o ID e o novo título da tarefa.
   */
  editTask({ id, title }: { id: number; title: string }): void {
    this.taskService.updateTask(id, title);
    this.tasks = this.taskService.getTasks();
  }

  /**
   * Reordena as tarefas após um evento de arrastar e soltar.
   * @param event - Evento de arrastar e soltar.
   */
  drop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  /**
   * Retorna a contagem de tarefas concluídas.
   * @returns Número de tarefas concluídas.
   */
  public get completedTasksCount(): number {
    return this.tasks.filter((task) => task.isCompleted).length;
  }

  /**
   * Retorna a contagem de tarefas não concluídas.
   * @returns Número de tarefas não concluídas.
   */
  public get incompleteTasksCount(): number {
    return this.tasks.filter((task) => !task.isCompleted).length;
  }
}

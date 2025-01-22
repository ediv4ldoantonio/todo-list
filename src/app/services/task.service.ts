import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

/**
 * Serviço responsável por gerenciar as tarefas.
 *
 * @@Injectable
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];

  /**
   * Retorna a lista de tarefas.
   *
   * @returns {Task[]} Lista de tarefas.
   */
  getTasks(): Task[] {
    return this.tasks;
  }

  /**
   * Adiciona uma nova tarefa.
   *
   * @param {string} title - Título da nova tarefa.
   */
  addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      isCompleted: false,
    };
    this.tasks.push(newTask);
    this.saveToLocalStorage();
  }

  /**
   * Atualiza o título de uma tarefa existente.
   *
   * @param {number} id - ID da tarefa a ser atualizada.
   * @param {string} title - Novo título da tarefa.
   */
  updateTask(id: number, title: string): void {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.title = title;
      this.saveToLocalStorage();
    }
  }

  /**
   * Alterna o estado de conclusão de uma tarefa.
   *
   * @param {number} id - ID da tarefa a ser atualizada.
   */
  toggleTaskCompletion(id: number): void {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.isCompleted = !task.isCompleted;
      this.saveToLocalStorage();
    }
  }

  /**
   * Remove uma tarefa da lista.
   *
   * @param {number} id - ID da tarefa a ser removida.
   */
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveToLocalStorage();
  }

  /**
   * Salva a lista de tarefas no Local Storage.
   *
   * @private
   */
  private saveToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  /**
   * Carrega a lista de tarefas do Local Storage.
   *
   * @private
   */
  private loadFromLocalStorage(): void {
    const data = localStorage.getItem('tasks');
    if (data) {
      this.tasks = JSON.parse(data);
    }
  }
}

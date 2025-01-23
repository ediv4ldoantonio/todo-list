import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { Task } from '../../models/task.model';

/**
 * Componente que representa um item de tarefa.
 *
 * @selector 'task-item'
 * @templateUrl './task-item.component.html'
 * @styleUrls ['./task-item.component.css'
 * @standalone true
 * @encapsulation ViewEncapsulation.None
 */
@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class TaskItemComponent {
  /**
   * A tarefa a ser exibida.
   */
  @Input() task!: Task;

  /**
   * Evento emitido quando a tarefa é deletada.
   */
  @Output() delete = new EventEmitter<number>();

  /**
   * Evento emitido quando o status da tarefa é alternado.
   */
  @Output() toggle = new EventEmitter<number>();

  /**
   * Método chamado ao deletar a tarefa.
   * Emite o evento de deletar com o ID da tarefa.
   */
  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  /**
   * Método chamado ao alternar o status da tarefa.
   * Emite o evento de alternar com o ID da tarefa.
   */
  onToggle(): void {
    this.toggle.emit(this.task.id);
  }
}

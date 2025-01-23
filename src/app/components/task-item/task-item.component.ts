import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();

  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  onToggle(): void {
    this.toggle.emit(this.task.id);
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  standalone: true,
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();
  @Output() edit = new EventEmitter<{ id: number; title: string }>();

  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  onToggle(): void {
    this.toggle.emit(this.task.id);
  }

  onEdit(): void {
    const updatedTitle = prompt('Edit Task', this.task.title);
    if (updatedTitle && updatedTitle.trim()) {
      this.edit.emit({ id: this.task.id, title: updatedTitle.trim() });
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TaskGroup } from '../model/TaskGroup';
import { Task } from '../model/Task';
import { selectTasksForGroup } from '../store/selectors';
import { DeleteTasksFromGroup, MoveToGroup, DeleteTask } from '../store/task.action';
import { DeleteTaskGroup, UpdateTaskGroupName } from '../store/task-group.action';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.scss']
})
export class TaskGroupComponent implements OnInit {
  @Input() group: TaskGroup;

  public tasks$: Observable<Task[]>;

  public name: FormControl;

  constructor(private _router: Router,
    private _store: Store<{ tasks: Task[] }>,
    private _dialog: MatDialog) {}

  public ngOnInit(): void {
    this.tasks$ = this._store.pipe(select(selectTasksForGroup(this.group.id)));
    this.name = new FormControl(this.group.name);
  }

  public addTask(): void {
    this._router.navigate(['add-task', this.group.id]);
  }

  public removeTaskGroup(): void {
    this._store.dispatch(new DeleteTasksFromGroup(this.group.id));
    this._store.dispatch(new DeleteTaskGroup(this.group));
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      const taskId: number = <any> event.item.data;
      const groupId: number = <any> event.container.data;
      this._store.dispatch(new MoveToGroup({taskId, groupId}));
    }
  }

  public showDialog(task: Task): void {
    const dialogRef = this._dialog.open(TaskDialogComponent, { data : task });
    dialogRef.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this._store.dispatch(new DeleteTask(task));
      }
    });
  }

  public updateName(): void {
    if (this.name.value.trim() === '') {
      this.name.setValue(this.group.name);
    } else {
      this._store.dispatch(new UpdateTaskGroupName({
        groupId: this.group.id,
        newName: this.name.value
      }));
    }
  }
}

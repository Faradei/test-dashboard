import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskGroup } from '../model/TaskGroup';
import { Task } from '../model/Task';
import { selectTasksForGroup } from '../store/selectors';
import { DeleteTasksFromGroup } from '../store/task.action';
import { DeleteTaskGroup } from '../store/task-group.action';

@Component({
  selector: 'task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.scss']
})
export class TaskGroupComponent implements OnInit {
  @Input() group: TaskGroup;

  public tasks$: Observable<Task[]>;

  constructor(private _router: Router, private _store: Store<{ tasks: Task[] }>) {}

  public ngOnInit(): void {
    this.tasks$ = this._store.pipe(select(selectTasksForGroup(this.group.id)));
  }

  public addTask(): void {
    this._router.navigate(['add-task', this.group.id]);
  }

  public removeTaskGroup(): void {
    this._store.dispatch(new DeleteTasksFromGroup(this.group.id));
    this._store.dispatch(new DeleteTaskGroup(this.group));
  }
}

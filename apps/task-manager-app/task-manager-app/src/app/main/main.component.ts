import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskGroup } from '../model/TaskGroup';
import { AddTaskGroup } from '../store/task-group.action';
import { selectAllTaskGroups } from '../store/selectors';

@Component({
  selector: 'local-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public taskGroups$: Observable<TaskGroup[]>;

  constructor(private _store: Store<{ taskGroups: TaskGroup[] }>) {
    this.taskGroups$ = _store.pipe(select(selectAllTaskGroups));
  }

  public addTaskGroup(): void {
    this._store.dispatch(new AddTaskGroup());
  }
}

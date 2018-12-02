import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task } from '../model/Task';
import { AddTask } from '../store/task.action';

@Component({
  selector: 'local-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  public taskForm = this._fb.group({
    taskTitle: ['', Validators.required],
    taskDescription: ['', Validators.required]
  });

  private _currentId: string;

  constructor(private _fb: FormBuilder,
    private _store: Store<{ tasks: Task[] }>,
    private _route: ActivatedRoute,
    private _router: Router) {}

  public onSubmit(): void {
    this._store.dispatch(new AddTask({
      title: this.taskForm.value.taskTitle,
      description: this.taskForm.value.taskDescription,
      groupId: Number(this._route.snapshot.paramMap.get('id'))
    }));
    this._router.navigate(['']);
  }
}

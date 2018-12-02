import { Action } from '@ngrx/store';
import { TaskGroup } from '../model/TaskGroup';

export enum ActionTypes {
  AddTaskGroup = '[TASK_GROUP] Add',
  DeleteTaskGroup = '[TASK_GROUP] Delete'
}

export class AddTaskGroup implements Action {
  readonly type = ActionTypes.AddTaskGroup;

  constructor() {}
}

export class DeleteTaskGroup implements Action {
  readonly type = ActionTypes.DeleteTaskGroup;

  constructor(public payload: TaskGroup) {}
}


export type TaskGroupAction = AddTaskGroup | DeleteTaskGroup;

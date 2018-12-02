import { Action } from '@ngrx/store';
import { Task } from '../model/Task';

export enum ActionTypes {
  AddTask = '[TASK] Add',
  DeleteTask = '[TASK] Delete',
  DeleteTasksFromGroup = '[TASK] DeleteTasksFromGroup'
}

export class AddTask implements Action {
  readonly type = ActionTypes.AddTask;

  constructor(public payload: {
    title: string,
    description: string,
    groupId: number
  }) {}
}

export class DeleteTask implements Action {
  readonly type = ActionTypes.DeleteTask;

  constructor(public payload: Task) {}
}

export class DeleteTasksFromGroup implements Action {
  readonly type = ActionTypes.DeleteTasksFromGroup;

  constructor(public payload: number) {}
}

export type TaskAction = AddTask | DeleteTask | DeleteTasksFromGroup;

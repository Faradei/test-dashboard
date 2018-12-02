import { Action } from '@ngrx/store';
import { TaskGroup } from '../model/TaskGroup';

export enum ActionTypes {
  AddTaskGroup = '[TASK_GROUP] Add',
  DeleteTaskGroup = '[TASK_GROUP] Delete',
  UpdateGroupName = '[TASK_GROUP] UpdateName'
}

export class AddTaskGroup implements Action {
  readonly type = ActionTypes.AddTaskGroup;

  constructor() {}
}

export class DeleteTaskGroup implements Action {
  readonly type = ActionTypes.DeleteTaskGroup;

  constructor(public payload: TaskGroup) {}
}

export class UpdateTaskGroupName implements Action {
  readonly type = ActionTypes.UpdateGroupName;

  constructor(public payload: { groupId: number, newName: string }) {}
}


export type TaskGroupAction = AddTaskGroup | DeleteTaskGroup | UpdateTaskGroupName;

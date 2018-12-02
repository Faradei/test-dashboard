import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskGroupState } from './task-group.reducer';
import * as fromTaskGroup from './task-group.reducer';
import { TaskState } from './task.reducer';
import * as fromTask from './task.reducer';

export const selectTaskGroupsState = createFeatureSelector<TaskGroupState>('taskGroups');
export const selectAllTaskGroups = createSelector(selectTaskGroupsState, fromTaskGroup.selectAll);

export const selectTasksState = createFeatureSelector<TaskState>('tasks');
export const selectAllTasks = createSelector(selectTasksState, fromTask.selectAll);
export const selectTasksForGroup = (taskGroupId: number) => createSelector(selectAllTasks, tasks => {
  return tasks.filter((task) => {
    return task.taskGroupId === taskGroupId;
  });
});

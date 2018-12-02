import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '../model/Task';

@Component({
  selector: 'local-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task) {}
}

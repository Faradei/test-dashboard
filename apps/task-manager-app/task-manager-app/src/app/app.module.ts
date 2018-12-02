import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { taskGroupReducer } from './store/task-group.reducer';
import { taskReducer } from './store/task.reducer';
import { TaskGroupComponent } from './task-group/task-group.component';
import { TaskComponent } from './task/task.component';
import { MainComponent } from './main/main.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'add-task/:id',
    component: AddTaskComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [AppComponent, TaskGroupComponent, TaskComponent, MainComponent, AddTaskComponent, TaskDialogComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    NxModule.forRoot(),
    StoreModule.forRoot({
      taskGroups: taskGroupReducer,
      tasks: taskReducer
    }),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  entryComponents: [TaskDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

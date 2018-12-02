import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { TaskGroup } from './model/TaskGroup';
import { selectTaskGroupsIds } from './store/selectors';

@Injectable({
  providedIn: 'root'
})
export class AddTaskGuard implements CanActivate {

  constructor(private router: Router, private _store: Store<{ taskGroups: TaskGroup[] }>) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    return new Observable<boolean>((observer) => {
      this._store.pipe(select(selectTaskGroupsIds)).subscribe(ids => {
        const param: number = Number(route.paramMap.get('id'));
        let result: boolean = false;

        for (let id of ids) {
          if (id === param) {
            result = true;
            break;
          }
        }

        if (!result) {
          this.router.navigate(['']);  
        }
        
        observer.next(result);
        observer.complete();
      });
    });
    
  }
}
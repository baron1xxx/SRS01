import {Observable, Subject} from 'rxjs';

export class ModalRef {

  private afterClosed$ = new Subject<any>();
  afterClosed: Observable<any> = this.afterClosed$.asObservable();

  close(result?: any): void {
    this.afterClosed$.next(result);
  }
}

import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentService } from './../services/document.service';

@Injectable()
export class DocumentResolver implements Resolve<any> {
  constructor(private documentService: DocumentService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.documentService.getAllDocuments();
  }
}

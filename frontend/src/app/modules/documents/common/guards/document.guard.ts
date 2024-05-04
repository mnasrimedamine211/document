import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DocumentStoreService } from '../services/document-store.service';

@Injectable()
export class DocumentGuard implements CanActivate {
  constructor(
    private documentStoreService: DocumentStoreService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      state.url.includes('details') &&
      Object.keys(this.documentStoreService.document).length === 0
    ) {
      this.router.navigate(['/']);
      return false;
    }

    if (
      state.url.includes('add') &&
      Object.keys(this.documentStoreService.documentType).length === 0
    ) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}

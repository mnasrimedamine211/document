import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { DocumentResolver } from './common/resolver/document.resolver';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { DocumentGuard } from './common/guards/document.guard';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      documents: DocumentResolver,
    },
    children: [
      {
        path: 'add',
        component: AddDocumentComponent,
        canActivate: [DocumentGuard],
      },
      {
        path: 'details',
        component: DocumentDetailsComponent,
        canActivate: [DocumentGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsRoutingModule {}

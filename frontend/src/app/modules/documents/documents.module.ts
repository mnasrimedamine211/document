import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents-routing.module';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddDocumentComponent } from './add-document/add-document.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DocumentStoreService } from './common/services/document-store.service';
import { DocumentService } from './common/services/document.service';
import { DocumentResolver } from './common/resolver/document.resolver';
import { CardComponent } from 'src/app/components/card/card.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { DocumentGuard } from './common/guards/document.guard';

@NgModule({
  declarations: [ListComponent, AddDocumentComponent, DocumentDetailsComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatSnackBarModule,
    CardComponent
  ],
  providers: [DocumentService, DocumentStoreService, DocumentResolver , DocumentGuard],
})
export class DocumentsModule {}

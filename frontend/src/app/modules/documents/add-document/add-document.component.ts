import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { DocumentStoreService } from './../common/services/document-store.service';
import { Annotation, Document, Label, Select } from 'src/app/utils/interface';
import { DocumentService } from '../common/services/document.service';
import { delay, finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css'],
})
export class AddDocumentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('textContent') textContent!: ElementRef;

  document: Document = { text: '', annotations: [] };
  text: string = '';
  labels: Label[] = [];
  selectionItem: Select = { start: 0, end: 0, text: '' };
  annutations: Annotation[] = [];

  constructor(
    private documentService: DocumentService,
    private documentStoreService: DocumentStoreService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.text = this.documentStoreService.documentType
      ? this.documentStoreService.documentType?.text
      : '';
    this.labels = this.documentStoreService.documentType
      ? this.documentStoreService.documentType?.labels
      : [];
  }

  ngOnInit(): void {
    this.documentService.openEditDrawer();
    this.document.text = this.text;
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.documentService.closeEditDrawer().then(() => true);
    this.documentStoreService.documentType = { text: '', labels: [] };
    this.documentStoreService.document = { text: '', annotations: [] };
  }

  applyLabel(label: Label): void {
    const selection = window.getSelection();
    if (
      selection &&
      selection.rangeCount > 0 &&
      selection.toString().trim() !== ''
    ) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.backgroundColor = label.color;
      span.style.color = 'white';
      span.style.padding = '5px';
      span.textContent = selection.toString();
      range.deleteContents();
      range.insertNode(span);
      const text: string = selection.toString();
      const start: number = range.startOffset;
      const end: number = start + text.length;
      this.document.annotations.push({
        label: label.label,
        color: label.color,
        start: start,
        end: end,
        text: text,
      });
    }
  }

  //notification
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
  exportToJson(): void {
    const dataStr = JSON.stringify(this.document);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'document.json');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  save() {
    if (this.document?.annotations?.length > 0) {
      this.documentService
        .addDocument(this.document)
        .pipe(
          finalize(() => {
            delay(2000);
          })
        )
        .subscribe({
          next: () => {
            this.openSnackBar('The document is added', 'x');
            setTimeout(() => {
              this.router.navigateByUrl('/');
            }, 1000);

          },
          error: (error) => {
            this.openSnackBar(error.toString(), 'x');
          },
        });
    }
    //this.exportToJson();
  }
}

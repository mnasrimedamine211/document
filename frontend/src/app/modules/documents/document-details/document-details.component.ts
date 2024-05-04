import { DocumentService } from './../common/services/document.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Annotation, Document, Label } from 'src/app/utils/interface';
import { DocumentStoreService } from '../common/services/document-store.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css'],
})
export class DocumentDetailsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('textContent') textContent!: ElementRef;
  document: Document = { text: '', annotations: [] };
  uniqueLabels: Annotation[] = [];

  constructor(
    private documentService: DocumentService,
    private documentStoreService: DocumentStoreService
  ) {
    this.document = this.documentStoreService.document;
  }

  ngOnInit(): void {
    this.documentService.openEditDrawer();
    const annotations: Annotation[] = this.document.annotations;
    const list = new Set(annotations.map((item) => item.label));
    this.uniqueLabels = Array.from(list)
      .map((label) => {
        return (
          annotations.find((annotation) => annotation.label === label) ||
          ({} as Annotation)
        );
      })
      .filter((annotation) => annotation.label);
  }
  ngAfterViewInit(): void {
    let content = this.textContent.nativeElement;
    let innerHTML = content.innerHTML;
    this.document.annotations.forEach((annotation: Annotation) => {
      const span = `<span style="background-color: ${annotation.color}; color: white; padding: 5px;">${annotation.text}</span>`;
      innerHTML = innerHTML.replace(new RegExp(annotation?.text, 'g'), span);
    });
    content.innerHTML = innerHTML;
  }
  ngOnDestroy(): void {
    this.documentService.closeEditDrawer().then(() => true);
    this.documentStoreService.document = { text: '', annotations: [] };
  }
}

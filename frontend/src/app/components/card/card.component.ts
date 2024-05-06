import { DocumentStoreService } from './../../modules/documents/common/services/document-store.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import {
  Annotation,
  Document,
  DocumentType,
  Label,
} from 'src/app/utils/interface';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'document-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [MatCardModule, MatDividerModule, MatButtonModule, CommonModule],
})
export class CardComponent implements OnInit {
  @Input() document!: Document;
  @Input() index: number = 1;
  @Output() seeDetailsEvent = new EventEmitter<boolean>(false);
  uniqueLabels: Annotation[] = [];
  constructor(
    private documentStoreService: DocumentStoreService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
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
  seeDetails() {
    this.documentStoreService.document = this.document;
    this.seeDetailsEvent.emit(true);
    this._router
      .navigate(['./', 'details'], { relativeTo: this._activatedRoute })
      .then(() => {});
  }
}

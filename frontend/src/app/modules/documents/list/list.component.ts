import {
  Annotation,
  Document,
  DocumentType,
  Label,
} from './../../../utils/interface';
import { DocumentStoreService } from './../common/services/document-store.service';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';

import { colors, getRandomColor } from 'src/app/utils/util';
import { DocumentService } from '../common/services/document.service';
import {
  Observable,
  Subject,
  debounceTime,
  finalize,
  map,
  of,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {
  documentForm!: FormGroup;
  @ViewChild('editDrawer', { static: true }) editDrawer!: MatDrawer;
  drawerMode: 'side' | 'over' = 'side';
  createNewDocument: boolean = false;
  documentType!: DocumentType;
  documentsList$!: Observable<Document[]>;
  colors = colors;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private documentService: DocumentService,
    private documentStoreService: DocumentStoreService,
    private formBuilder: FormBuilder
  ) {
    this.documentForm = this.formBuilder.group({
      text: ['', Validators.required],
      addLabels: this.formBuilder.group({
        label: ['', Validators.required],
        labels: this.formBuilder.array([]),
      }),
    });
  }

  ngOnInit(): void {
    this.documentService.editDrawer = this.editDrawer;

    this.documentType = {
      text: '',
      labels: [],
    };
    this.documentsList$ = this.documentStoreService.list$;
  }
  ngOnDestroy(): void {}
  ngAfterViewInit(): void {}

  get addLabelForm(): FormGroup {
    return this.documentForm.get('addLabels') as FormGroup;
  }

  get labelControls() {
    return (this.addLabelForm.get('labels') as FormArray).controls;
  }

  addLabel(event: Event) {
    event.preventDefault();
    if (this.addLabelForm.valid) {
      const label = this.addLabelForm.value.label;
      const labelsArray = this.addLabelForm.get('labels') as FormArray;
      if (label) {
        labelsArray.push(this.formBuilder.control(label));
      }
      this.addLabelForm.patchValue({ label: '' });
      this.addLabelForm.controls['label'].clearValidators();
      this.addLabelForm.controls['label'].updateValueAndValidity();
    }
  }
  createDocument() {
    this.createNewDocument = true;
  }
  showOnlyList() {
    this.createNewDocument = false;
  }

  onSubmit() {
    if (this.labelControls.length <= 0) {
      this.addLabelForm.markAllAsTouched();
    } else if (this.labelControls.length > 0) {
      this.addLabelForm.controls['label'].clearValidators();
      this.addLabelForm.controls['label'].updateValueAndValidity();
    } else {
      this.addLabelForm.controls['label'].clearValidators();
      this.addLabelForm.controls['label'].updateValueAndValidity();
    }
    if (this.documentForm.invalid) return;
    const {
      text,
      addLabels: { labels },
    } = this.documentForm.value;

    if (labels.length > 0) {
      labels.map((label: string) => {
        const newLabel: Label = {
          label: label,
          color: getRandomColor(),
        };
        this.documentType.labels.push(newLabel);
      });
    }
    this.documentType.text = text;
    this.documentStoreService.documentType = this.documentType;

    this._router
      .navigate(['./', 'add'], { relativeTo: this._activatedRoute })
      .then(() => {});
    this.documentForm.reset();
    this.createNewDocument = false;
    this._changeDetectorRef.markForCheck();
  }
  onBackdropClicked(): void {
    this._router.navigate(['./'], { relativeTo: this._activatedRoute });
    this._changeDetectorRef.markForCheck();
  }
}

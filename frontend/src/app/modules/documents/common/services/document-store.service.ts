import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Document, DocumentType } from 'src/app/utils/interface';

@Injectable({
  providedIn: 'root',
})
export class DocumentStoreService {
  constructor() {}
  // store document type enter by user
  private documentTypeSubject: BehaviorSubject<DocumentType> =
    new BehaviorSubject<DocumentType>({} as DocumentType);

  get documentType$(): Observable<DocumentType> {
    return this.documentTypeSubject.asObservable();
  }

  get documentType(): DocumentType {
    return this.documentTypeSubject.value;
  }

  set documentType(value: DocumentType) {
    this.documentTypeSubject.next(value);
  }

  // documents list
  private listsubject: BehaviorSubject<Document[]> = new BehaviorSubject<
    Document[]
  >([] as Document[]);

  set list(data: Document[]) {
    this.listsubject.next(data);
  }

  get list$(): Observable<Document[]> {
    return this.listsubject.asObservable();
  }
  get list(): Document[] {
    return this.listsubject.value;
  }

  // document
  private documentSubject: BehaviorSubject<Document> =
    new BehaviorSubject<Document>({} as Document);

  set document(data: Document) {
    this.documentSubject.next(data);
  }

  get document$(): Observable<Document> {
    return this.documentSubject.asObservable();
  }
  get document(): Document {
    return this.documentSubject.value;
  }
}

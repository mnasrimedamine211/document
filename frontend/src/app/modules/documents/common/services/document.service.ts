import { DocumentStoreService } from './document-store.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';
import { Observable, lastValueFrom, of, switchMap } from 'rxjs';
import { Document } from 'src/app/utils/interface';

@Injectable()
export class DocumentService {
  editDrawer!: MatDrawer;
  apiUrl = 'http://127.0.0.1:8000/app/';

  constructor(
    private documentStoreService: DocumentStoreService,
    private http: HttpClient
  ) {}

  openEditDrawer(): void {
    this.editDrawer?.open();
  }

  closeEditDrawer(): Promise<MatDrawerToggleResult> {
    return this.editDrawer.close();
  }

  addDocument(document: Document): Observable<any> {
    return this.http
      .post(this.apiUrl + 'add/', document, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        switchMap(async ( data : any) => {
          if (data) {
            await lastValueFrom(this.getAllDocuments());
          }
          return of(data);
        })
      );
  }
  getAllDocuments(): Observable<Document[]> {
    return this.http.get<any[]>(this.apiUrl + 'getAll/').pipe(
      switchMap((data: any[]) => {
        let documents = data.map((item: any) => this.jsonToDocument(item));
        this.documentStoreService.list = documents;
        return of(documents);
      })
    );
  }
  jsonToDocument(rawData: any): Document {
    return {
      text: rawData.text,
      annotations: rawData.annotations.map((ann: any) => ({
        label: ann.label,
        color: ann.color,
        start: ann.start,
        end: ann.end,
        text: ann.text,
      })),
    };
  }
}

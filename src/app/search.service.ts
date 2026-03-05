import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface SearchResult {
  assyrian: string[];
  english: string[];
  arabic: string[];
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<SearchResult> {
    // Dummy response — replace with real API call, e.g.:
    // return this.http.get<SearchResult>(`/api/search?q=${encodeURIComponent(query)}`);
    const dummy: SearchResult = {
      assyrian: [`${query} — ܡܠܬܐ ܩܕܡܝܬܐ`, `${query} — ܡܠܬܐ ܬܪܝܢܝܬܐ`],
      english: [`${query} — first meaning`, `${query} — second meaning`],
      arabic: [`${query} — المعنى الأول`, `${query} — المعنى الثاني`],
    };
    return of(dummy).pipe(delay(300));
  }
}

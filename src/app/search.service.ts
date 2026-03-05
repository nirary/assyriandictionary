import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SearchResult {
  assyrian: string[];
  english: string[];
  arabic: string[];
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly apiUrl = 'http://localhost:8000/search';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(this.apiUrl, {
      params: { q: query },
    });
  }
}

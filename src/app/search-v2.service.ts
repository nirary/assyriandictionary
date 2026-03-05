import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchResult } from './search.service';

// ── Configuration ────────────────────────────────────────────
// 1. Share your Google Sheet: Share → Anyone with the link → Viewer
// 2. SHEET_ID: the long ID in the sheet URL
//    https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
// 3. GID: the tab ID shown in the URL when a sheet tab is selected (0 = first tab)
// 4. API_KEY: a Google Cloud API key with the Google Sheets API enabled
//
// Expected sheet columns:
//   A → English | B → Arabic | C → Assyrian  (row 1 is the header, skipped automatically)
// ─────────────────────────────────────────────────────────────
const SHEET_ID = '1c-A7eN_mnIpCy5veySneOXplfNP9yiiF_25OmYzXqEo';
const GID      = '586305198';

@Injectable({ providedIn: 'root' })
export class SearchServiceV2 {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<SearchResult> {
    const term = query.trim().toLowerCase();

    // Google Visualization Query Language — filtering happens on Google's servers.
    // lower() normalises case; CONTAINS does substring match.
    const tq = `SELECT A, B, C WHERE lower(A) CONTAINS '${term}' OR lower(B) CONTAINS '${term}' OR lower(C) CONTAINS '${term}' LIMIT 20`;

    const url =
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq` +
      `?tqx=out:json&tq=${encodeURIComponent(tq)}&gid=${GID}`;

    return this.http.get(url, { responseType: 'text' }).pipe(
      map(raw => this.parseResponse(raw))
    );
  }

  /**
   * The gviz endpoint wraps JSON in a JS callback:
   *   /*O_o* /\ngoogle.visualization.Query.setResponse({...});
   * Strip the wrapper before parsing.
   */
  private parseResponse(raw: string): SearchResult {
    const json = raw.substring(raw.indexOf('{'), raw.lastIndexOf('}') + 1);
    const data = JSON.parse(json);

    const rows: string[][] = (data.table?.rows ?? []).map((row: any) =>
      (row.c as any[]).map(cell => cell?.v ?? '')
    );

    return {
      assyrian: rows.map(r => r[2]),
      english:  rows.map(r => r[0]),
      arabic:   rows.map(r => r[1]),
    };
  }
}

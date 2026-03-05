import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchResult } from './search.service';
import { SearchServiceV2 as SearchService } from './search-v2.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  searchQuery = '';
  results: SearchResult | null = null;
  isLoading = false;

  constructor(private searchService: SearchService, private cdr: ChangeDetectorRef) {}

  onQueryChange(query: string): void {
    if (!query.trim()) {
      this.results = null;
      this.cdr.markForCheck();
    }
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) return;
    this.isLoading = true;
    this.results = null;
    this.searchService.search(this.searchQuery).subscribe({
      next: result => {
        this.results = result;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }
}

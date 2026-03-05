import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchService, SearchResult } from './search.service';

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

  constructor(private searchService: SearchService) {}

  onSearch(): void {
    if (!this.searchQuery.trim()) return;
    this.isLoading = true;
    this.results = null;
    this.searchService.search(this.searchQuery).subscribe(result => {
      this.results = result;
      this.isLoading = false;
    });
  }
}

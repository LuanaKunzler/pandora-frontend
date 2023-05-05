import { BrowseState } from './../store/browse/browse.reducer';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as fromApp from '../store/app.reducers';
import { Store } from '@ngrx/store';
import * as BrowseActions from '../store/browse/browse.actions';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {


  sortBy = [
    {
      display: 'Any',
      value: 'any'
    },
    {
      display: 'Lowest Price',
      value: 'lowest'
    },
    {
      display: 'Highest Price',
      value: 'highest'
    }
  ];

  browseOptionsForm: FormGroup | any;

  browseState: Observable<BrowseState> = new Observable<BrowseState>();;
  canFetchSubscription: Subscription = new Subscription;

  canFetch = false;
  selectedPage = 0;
  selectedSort = 'any';
  selectedCategory = 'any';
  selectedAuthor = 'any';
  minPrice = '0';
  maxPrice = '0';

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.browseState = this.store.select('browse');
    this.canFetchSubscription = this.browseState.subscribe(data => {
      this.canFetch = data.canFetch;
    });

    this.browseState.pipe(take(1)).subscribe(data => {
      this.selectedPage = data.selectedPage;
      this.selectedSort = data.selectedSort;
      this.selectedCategory = data.selectedCategory;
      this.selectedAuthor = data.selectedAuthor;
      this.minPrice = data.minPrice;
      this.maxPrice = data.maxPrice;

      if (data.categories.length === 0) {
        this.store.dispatch(new BrowseActions.FetchCategory());
      }
      if (!data.authors || data.authors.length === 0) {
        this.store.dispatch(new BrowseActions.FetchAuthors());
      }
      if (data.books.length === 0) {
        this.getBooks();
      }
    });


  }

  ngOnDestroy(): void {
    if (this.canFetchSubscription) {
      this.canFetchSubscription.unsubscribe();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {
    if ((window.innerHeight + window.scrollY + 400) >= document.body.offsetHeight) {
      if (this.canFetch) {
        this.getBooksAppend();
      }
    }
  }

  selectMin(minPrice: string) {
    this.minPrice = minPrice.trim().length === 0 ? '0' : minPrice.trim();
    this.getBooks();
  }

  selectMax(maxPrice: string) {
    this.maxPrice = maxPrice.trim().length === 0 ? '0' : maxPrice.trim();
    this.getBooks();

  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.getBooks();
  }

  selectAuthor(author: string) {
    this.selectedAuthor = author;
    this.getBooks();
  }

  selectSort(sort: string) {
    this.selectedSort = sort;
    this.getBooks();
  }

  clearCategory() {
    this.selectedCategory = 'any';
    this.getBooks();
  }


  clearPrice() {
    this.minPrice = '0';
    this.maxPrice = '0';
    this.getBooks();
  }

  clearAuthor() {
    this.selectedAuthor = 'any';
    this.getBooks();
  }


  getBooks() {
    this.selectedPage = 0;
    this.store.dispatch(new BrowseActions.FetchBooks({ page: this.selectedPage, sort: this.selectedSort, category: this.selectedCategory, author: this.selectedAuthor, minPrice: this.minPrice, maxPrice: this.maxPrice }));
    this.getBooksCount();
    this.selectedPage++;
  }

  getBooksCount() {
    this.store.dispatch(new BrowseActions.FetchBooksCount({ category: this.selectedCategory, author: this.selectedAuthor, minPrice: this.minPrice, maxPrice: this.maxPrice }));
  }

  getBooksAppend() {
    this.store.dispatch(new BrowseActions.FetchBooksAppend({ page: this.selectedPage, sort: this.selectedSort, category: this.selectedCategory, author: this.selectedAuthor, minPrice: this.minPrice, maxPrice: this.maxPrice }));
    this.selectedPage++;
  }
}

import { Component, OnInit } from '@angular/core';
import { Book } from './models/book.model';
import { BookService } from './services/book.service';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookListComponent } from './components/book-list/book-list.component';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, BookFormComponent, BookListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title(title: any) {
	  throw new Error('Method not implemented.');
  }
  books: Book[] = [];
  currentBook: Book | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((data) => (this.books = data));
  }

  onSave(book: Book) {
    if (book.id === 0) {
      this.bookService.createBook(book).subscribe(() => this.loadBooks());
    } else {
      this.bookService.updateBook(book).subscribe(() => this.loadBooks());
    }
    this.currentBook = null;
  }

  onEdit(book: Book) {
    this.currentBook = { ...book };
  }

  onDelete(id: number) {
    this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
  }

  onCancel() {
    this.currentBook = null;
  }
}

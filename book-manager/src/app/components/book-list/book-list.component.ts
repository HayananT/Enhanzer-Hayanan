import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule, // ✅ Include this
    MatButtonModule
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  @Input() books: Book[] = [];
  @Output() edit = new EventEmitter<Book>();
  @Output() delete = new EventEmitter<number>();

  displayedColumns: string[] = ['id', 'title', 'author', 'isbn', 'publicationDate', 'edit', 'delete'];

  onEdit(book: Book) {
    this.edit.emit(book);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}

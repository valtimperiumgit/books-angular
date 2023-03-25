import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from '../models/book';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/api/books/`);
  }

  getBookById(id: number): Observable<IBook> {
    return this.http.get<IBook>(`${this.apiUrl}/api/books/${id}`);
  }

  addBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(`${this.apiUrl}/api/books/`, book);
  }

  editBook(book: IBook): Observable<IBook> {
    return this.http.put<IBook>(`${this.apiUrl}/api/books/`, book);
  }
}
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';


import { MaterialExampleModule } from 'src/material.module';
import { AddBookModalComponent } from './components/books-list/add-book-modal/add-book-modal.component';
import { EditBookModalComponent } from './components/books-list/edit-book-modal/edit-book-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookComponent,
    AddBookModalComponent,
    EditBookModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {  }

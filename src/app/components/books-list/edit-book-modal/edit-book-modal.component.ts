import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IBook } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-edit-book-modal',
  templateUrl: './edit-book-modal.component.html',
  styleUrls: ['./edit-book-modal.component.css']
})
export class EditBookModalComponent implements OnInit {
  @Input() book: IBook; 

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.book.name, Validators.required),
      description: new FormControl(this.book.description, Validators.required),
      publicationDate: new FormControl(this.book.publicationDate, Validators.required),
      numberPages: new FormControl(this.book.numberPages, Validators.required)
    })
  }

  constructor(public activeModal: NgbActiveModal, private bookService: BookService) {}


  editBook() {
    let book = this.form.value;
    book.id = this.book.id;

    this.bookService.editBook(book).subscribe(data =>
      this.activeModal.close(book)
    );

  }
}

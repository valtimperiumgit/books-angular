import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IBook } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.css']
})
export class AddBookModalComponent implements OnInit {

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      publicationDate: new FormControl(new Date, Validators.required),
      numberPages: new FormControl('', Validators.required)
    })
  }

  form: FormGroup;


  constructor(public activeModal: NgbActiveModal, private bookService: BookService) {}


  addBook() {
    let book = this.form.value;

    this.bookService.addBook(book).subscribe(data =>
      this.activeModal.close(book)
    );

  }

}

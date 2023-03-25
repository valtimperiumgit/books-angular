import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IBook } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { AddBookModalComponent } from './add-book-modal/add-book-modal.component';
import { EditBookModalComponent } from './edit-book-modal/edit-book-modal.component';
import {Chart, registerables} from 'node_modules/chart.js'
Chart.register(...registerables);

interface BookCountByYear {
  [year: number]: number;
}


export enum SortBy {
  Name = 'name',
  PublicationDate = 'publicationDate',
  NumberPages = 'numberPages'
}

@Component({
  selector: 'books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: IBook[];
  filteredBooks: IBook[] = [];
  searchTerm: string = '';
  sortBy = SortBy;

  dateRange: string = 'month';

  activeRecord: any;

  fromDate: Date;
  toDate: Date;

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];
  

  constructor(private bookService: BookService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    this.bookService.getBooks().subscribe(
      (books: IBook[]) => {
        this.books = books;
        this.filteredBooks = books;

        const bookCountByYear: BookCountByYear = {};
        for (const book of books) {
          const bookDate = new Date(book.publicationDate);
          const year = bookDate.getFullYear();
          bookCountByYear[year] = (bookCountByYear[year] || 0) + 1;
        }
  
        // Convert book count by year to arrays for chart rendering
        this.labeldata = Object.keys(bookCountByYear);
        console.log(bookCountByYear)
        this.realdata = Object.values(bookCountByYear);
        this.colordata = this.generateColors(this.labeldata.length);

        
        this.renderChart(this.labeldata, this.realdata, this.colordata, 'bar', 'barchart');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  searchBooks() {
    this.filteredBooks = this.books
    .filter(book => book.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  sortFunctions = {
    name: (a: IBook, b: IBook) => a.name.localeCompare(b.name),
    publicationDate: (a: IBook, b: IBook) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime(),
    numberPages: (a: IBook, b: IBook) => b.numberPages - a.numberPages
  };

  sortBooks(sortBy: SortBy) {
    const sortFunction = this.sortFunctions[sortBy];
    this.filteredBooks = this.filteredBooks.sort(sortFunction);
  }

  filterByDate() {
    const filteredBooks = this.filteredBooks.filter(book => {
      const publicationDate = new Date(book.publicationDate);
      return publicationDate >= this.fromDate && publicationDate <= this.toDate;
    });
        this.filteredBooks = filteredBooks;
  }

  onDateRangeSelection() {
    if (this.dateRange === 'month') {
      const now = new Date();
      this.fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
      this.toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (this.dateRange === 'year') {
      const now = new Date();
      this.fromDate = new Date(now.getFullYear(), 0, 1);
      this.toDate = new Date(now.getFullYear(), 12, 0);
    }

    this.filterByDate();
  }

  onRecordClick(record: any) {
    this.activeRecord = record;
  }

  openAddBookModal() {
    const modalRef = this.modalService.open(AddBookModalComponent);
    modalRef.result.then((result) => {
      this.books.push(result);
    }).catch((error) => {
      
    });
  }

  openEditBookModal(id: string) {
    const modalRef = this.modalService.open(EditBookModalComponent);
    modalRef.componentInstance.book = this.books.find(book=> book.id == id);
    modalRef.result.then((result) => {
      this.books = this.books.filter(book => book.id != result.id);
      this.filteredBooks = this.books.filter(book => book.id != result.id);
      this.books.push(result);
      this.filteredBooks.push(result);
    }).catch((error) => {
      
    });
  }

  renderChart(labeldata:any, maindata:any, colordata:any, type:any, id:any) {
    console.log(labeldata)

    console.log(maindata)
    console.log(colordata)

    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: '# of Votes',
          data: maindata,
          backgroundColor: colordata,
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }

  generateColors(numColors: number): string[] {
    // TODO: implement color generation logic
    return [];
  }
}
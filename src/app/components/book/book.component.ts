import { Component, Input } from "@angular/core";


@Component({
    selector: "book",
    templateUrl: "./book.component.html"
})
export class BookComponent{
    @Input() id: string;
    @Input() name: string;
    @Input() publicationDate: Date;
    @Input() description: string;
    @Input() numberPages: number;
    @Input() editFunc: (id: string) => void;

}
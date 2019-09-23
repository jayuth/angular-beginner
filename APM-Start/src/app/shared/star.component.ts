import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges{
    // expose the rating property to the Container using @Input so the Container can provide rating value to it
    @Input() rating: number;
    // based on the rating
    starWidth: number;
    // set up an event to allow the child to be able to communicate with the parent
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void{
        // each star = 75 width so 5 stars = 5 * 75 / 5
        this.starWidth = this.rating * 75 / 5;
    }

    // after create an event, this function will be executed and return string value back to the parent
    onClick(): void{
        this.ratingClicked.emit(`The rating ${ this.rating } was clicked!`);
    }

    // Passing data from Child Nested component to Parent Container
    // 

}
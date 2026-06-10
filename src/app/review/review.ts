import { Component, input } from '@angular/core';

@Component({
  selector: 'app-review',
  standalone: true,
  templateUrl: './review.html',
  styleUrl: './review.css'
})
export class ReviewComponent {

  review = input.required<{
    user: string;
    date: string;
    rating: number;
    comment: string;
  }>();

  getStars(): number[] {
    return Array(this.review().rating).fill(0);
  }
}

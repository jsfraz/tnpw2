import { Component } from '@angular/core';
import { ReviewManagementService } from '../app/api/services/review-management.service'; 

@Component({
  selector: 'app-reviews',
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  reviewsToApprove: any[] = [];

  constructor(private reviewManagementService: ReviewManagementService) { }

  ngOnInit(): void {
    this.loadReviewsToApprove();
  }

  loadReviewsToApprove() {
    this.reviewManagementService.getReviewsToApprove().subscribe({
      next: (reviews) => {
        this.reviewsToApprove = reviews;
      },
      error: (e) => {
        console.error('Chyba při načítání recenzí:', e);
      }
    });
  }

  approveReview(reviewId: number) {
    this.reviewManagementService.approveReview({ body: { reviewId, approved: true } }).subscribe({
      next: () => {
        this.loadReviewsToApprove(); // Aktualizovat seznam
      },
      error: (e) => {
        console.error('Chyba při schvalování:', e);
      }
    });
  }

  rejectReview(reviewId: number) {
    this.reviewManagementService.approveReview({ body: { reviewId, approved: false } }).subscribe({
      next: () => {
        this.loadReviewsToApprove(); // Aktualizovat seznam
      },
      error: (e) => {
        console.error('Chyba při zamítnutí:', e);
      }
    });
  }
}

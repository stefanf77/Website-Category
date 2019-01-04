import { Component } from '@angular/core';
import { AppService } from './app.service.ts.service';
import { tap } from 'rxjs/operators';
import swal from 'sweetalert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  websiteLink: String = '';
  websiteCategory: String;

  constructor(private appService: AppService) {}

  sendCategoryRequest(): void {
    this.appService.postCategory(this.websiteLink).pipe(tap(
      success => {},
      error => {
        this.handleError(error.status);
      }
    ))
      .subscribe(category => this.websiteCategory = category);
  }

  handleError(status: number): void {
    if (status === 400) {
      swal('Error', 'You must write a valid website name', 'error');
    } else {
      swal('Error', 'There was a problem with this request', 'error');
    }
  }

  clearCategory(): void {
    this.websiteCategory = '';
  }
}

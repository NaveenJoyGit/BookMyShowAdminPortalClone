import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Movies } from 'src/app/Models/Movies';
import { MovieServiceService } from 'src/app/Services/movie-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  persons: any[] = [{
    id: 1,
    firstName: 'Naveen',
    lastName: 'Joy'
  }];

  movieList: Movies[] = [];

  constructor(private movieService: MovieServiceService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.movieService.getAllMovies().subscribe({
      next: data => {
        this.movieList = data;
        this.dtTrigger.next(data);
      },
      error: err => console.log(err)
    });

  }

  viewDetails(id: any) {
    console.log(id)
    this.router.navigate(['movie-details', id]);

  }

  addMovie() {
    this.router.navigateByUrl('/add-movie');
  }

  editMovie(id: any) {
    this.router.navigate(['edit-movie', id])
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}

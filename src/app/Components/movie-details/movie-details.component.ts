import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { IgxColumnComponent } from 'igniteui-angular';
import { MovieDetails, MovieDetailsResponse } from 'src/app/Models/MovieDetails';
import { MovieServiceService } from 'src/app/Services/movie-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  movieId: number = 0;
  movieDetailsResponse: MovieDetailsResponse[] = [];
  movieDetails: MovieDetails[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions2: DataTables.Settings = {};
  dtTrigger2: Subject<any> = new Subject<any>();
  locations: string[] = [];

  constructor(private activeRoute: ActivatedRoute,
    private movieService: MovieServiceService) { }

  locationSelect(data: any): void {
    this.dtOptions2 = {
      paging: false,
      searching: false
    };
    console.log(data)
    console.log(this.movieDetailsResponse)
    let details = this.movieDetailsResponse.filter(res => {
      if (res.location === data) {
        console.log(true);
        return true;
      }
      return false;
    }).map(resp => resp.movieDetails);
    this.movieDetails = [...details[0]];
    console.log(this.movieDetails);
    this.dtTrigger2.next(this.movieDetails)

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
    };


    this.activeRoute.paramMap.subscribe({
      next: param => {
        this.movieId = Number(param.get('id'));
        console.log(this.movieId);
      },
      error: err => console.log(err)
    });

    this.movieService.getMovieDetails(this.movieId).subscribe({
      next: data => {
        this.movieDetailsResponse = data;
        console.log(this.movieDetailsResponse);
        this.locations = data.map(md => md.location)
        this.dtTrigger.next(this.locations)
      },
      error: err => console.log(err)
    });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();
  }



}

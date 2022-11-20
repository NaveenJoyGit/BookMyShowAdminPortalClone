import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieServiceService } from 'src/app/Services/movie-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { AddMovieRequest } from 'src/app/Models/AddMovieResponse';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  movieId: number = 0;
  addMovieForm!: FormGroup;
  tradeTypes: any;
  subscription: Subscription = new Subscription();
  showError: boolean = false;
  errorMessage: string = '';
  addMovieRequest!: AddMovieRequest

  constructor(private activeRoute: ActivatedRoute,
    private movieService: MovieServiceService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: param => {
        this.movieId = Number(param.get('id'));
        console.log(this.movieId);
      },
      error: err => console.log(err)
    });

    this.addMovieForm = this.formBuilder.group({
      movieName: [''],
      cast: [''],
      language: [''],
      genre: [''],
      noOfLocations: ['']
    });
  }

  get movieName() {
    return this.addMovieForm.controls['movieName']?.value;
  }

  get cast() {
    return this.addMovieForm.controls['cast']?.value;
  }

  get language() {
    return this.addMovieForm.controls['language']?.value;
  }

  get genre() {
    return this.addMovieForm.controls['genre'].value;
  }

  get noOfLocations() {
    return this.addMovieForm.controls['noOfLocations'].value;
  }

  onFormSubmit() {
    console.log(this.addMovieForm)
    this.sendResponse();
  }

  sendResponse() {
    
    this.addMovieRequest = {
      movieName: this.movieName,
      cast: this.cast,
      language: this.language,
      genre: this.genre,
      noOfLocations: this.noOfLocations
    }
    this.movieService.editMovie(this.addMovieRequest, this.movieId).subscribe({
      next: data => this.router.navigateByUrl(''),
      error: err => console.log(err)
    });
    console.log(this.addMovieRequest)

  }

}

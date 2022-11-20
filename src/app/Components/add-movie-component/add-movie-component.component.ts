import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { AddMovieRequest } from 'src/app/Models/AddMovieResponse';
import { MovieServiceService } from 'src/app/Services/movie-service.service';

@Component({
  selector: 'app-add-movie-component',
  templateUrl: './add-movie-component.component.html',
  styleUrls: ['./add-movie-component.component.scss']
})
export class AddMovieComponentComponent implements OnInit {

  addMovieForm!: FormGroup;
  tradeTypes: any;
  subscription: Subscription = new Subscription();
  showError: boolean = false;
  errorMessage: string = '';
  addMovieRequest!: AddMovieRequest

  constructor(private formBuilder: FormBuilder,
    private movieService: MovieServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.addMovieForm = this.formBuilder.group({
      movieName: ['', Validators.required],
      cast: ['', Validators.required],
      language: ['', Validators.required],
      genre: ['', Validators.required],
      noOfLocations: ['', Validators.required]
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
    this.movieService.addMovie(this.addMovieRequest).subscribe({
      next: data => this.router.navigateByUrl(''),
      error: err => console.log(err)
    });
    console.log(this.addMovieRequest)

  }

}

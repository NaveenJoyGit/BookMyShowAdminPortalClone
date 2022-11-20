export interface MovieDetailsResponse {
    location: string,
    movieDetails: MovieDetails[]
}

export interface MovieDetails {
    theaterName: string,
    price: number,
    timings: string
}
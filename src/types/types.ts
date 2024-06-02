export type User = {
  firstName: string ;
  lastName: string ;
  email: string ;
  password: string ;
}

export type SearchShow = {
  Title: string;
  Year?: string;
  imdbID: string;
  Type?: string;
  Poster?: string;
};

type Rating = {
  Source: string;
  Value: string;
};

export type Show = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string | null;
  Website: string | null;
  Response: string;
};

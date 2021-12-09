export interface Clubs {
  clubs: Club[]
}


export interface Club {
  id: string;
  club_members: ClubMember[]
  club_name: string;
  club_address: string;
  total_members: number;
}

export interface ClubMember {
  name: string;
  age: number;
}


export interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

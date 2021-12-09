import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {Club, Clubs} from "@core/models/clubs.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClubsHttpService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getClub(id: string): Observable<Club> {
    const endpoint = `${environment.apiServer}/api/clubs/${id}/`
    return this.http.get<Club>(endpoint)
  }

  addClub(data: Club): Observable<Club> {
    const endpoint = `${environment.apiServer}/api/clubs/`
    return this.http.post<Club>(endpoint, data)
  }


  listClubs(): Observable<Club[]> {
    const endpoint = `${environment.apiServer}/api/clubs/`
    return this.http.get<Clubs>(endpoint).pipe(
      map(({clubs}) => clubs),
      map((clubs) => clubs.map((item) => ({...item, total_members: item.club_members?.length})))
    )
  }

  patchClub(data: Club): Observable<Club> {
    const endpoint = `${environment.apiServer}/api/clubs/${data.id}/`
    return this.http.patch<Club>(endpoint, data)
  }
}

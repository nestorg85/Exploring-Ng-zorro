import {Component, OnInit} from '@angular/core';
import {Club} from "@core/models/clubs.model";
import {ClubsHttpService} from "@core/services/clubs-http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss'],
})
export class ClubListComponent implements OnInit {
  loading = true;
  listOfColumn = [
    {
      title: 'Name',
      compare: (a: Club, b: Club) => a.club_name.localeCompare(b.club_name),
      priority: 3
    },
    {
      title: 'Address',
      compare: (a: Club, b: Club) => a.club_address.localeCompare(b.club_address),
      priority: 1
    },
    {
      title: 'Total Members',
      compare: (a: Club, b: Club) => a.total_members - b.total_members,
      priority: 2
    },
  ];
  listOfData: Club[] = [];
  expandSet = new Set<string>();
  msgResult?: string;

  constructor(
    private readonly clubsHttpService: ClubsHttpService,
    private readonly router: Router
  ) {
    this.msgResult = this.router.getCurrentNavigation()?.extras.state?.['msgResult']
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  ngOnInit(): void {
    this.clubsHttpService.listClubs()
      .subscribe((clubs) => {
        this.loading = false;
        this.listOfData = clubs
      })
  }

  editItem(data: Club) {
    this.router.navigateByUrl(`/clubs/change/${data.id}`, {state: {data}}).then();
  }

}

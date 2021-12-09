import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NAME_PATTERN} from "@core/constants/patterns.const";
import {ClubsHttpService} from "@core/services/clubs-http.service";
import {ClubMember} from "@core/models/clubs.model";

@Component({
  selector: 'app-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.scss']
})
export class ClubFormComponent implements OnInit {
  form: FormGroup
  id: string = this.activatedRoute.snapshot.params?.['id']

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly clubsHttpService: ClubsHttpService,
    private readonly router: Router
  ) {
    this.form = this.buildForm()
  }

  get members(): FormArray {
    return this.form.get("club_members") as FormArray;
  }


  get clubNameField(): FormControl {
    return this.form.get("club_name") as FormControl;
  }

  get clubAddressField(): FormControl {
    return this.form.get("club_address") as FormControl;
  }

  get membersControls() {
    return this.members.controls as FormGroup[];
  }


  ngOnInit(): void {
    if (this.id) {
      this.form.disable()
      this.clubsHttpService.getClub(this.id)
        .subscribe((club) => {
          this.form.patchValue(club)
          club.club_members.forEach((member) => this.addMember(member))
          this.form.enable()
        })
    }
  }

  submitForm() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.form.disable()

      const request = this.id ?
        this.clubsHttpService.patchClub({...this.form.value, id: this.id})
        : this.clubsHttpService.addClub(this.form.value)

      request.subscribe({
        next: async () => {
          await this.router.navigate(['/clubs'], {state: {msgResult: `The club was ${this.id ? 'updated' : 'created'} successfully`}})
        },
        error: ({error}) => {
          this.form.enable()
          error.detail.forEach((err: any) => this.form.get(err.loc[1])?.setErrors({'custom': err.msg}))
        }
      })
    }
  }

  addMember(member?: ClubMember) {
    const memberForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(NAME_PATTERN)]],
      age: [null, [Validators.required, Validators.min(10), Validators.max(100)]]
    });

    if (member) memberForm.setValue(member)

    this.members.push(memberForm);
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      club_name: [null, Validators.required],
      club_address: [null, Validators.required],
      club_members: this.formBuilder.array([])
    })
  }
}

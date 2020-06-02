import { Component, OnInit, NgZone, ViewChild, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CDisabilitas } from 'app/model/disabilitas';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-disabilitas',
  templateUrl: './add-disabilitas.component.html',
  styleUrls: ['./add-disabilitas.component.css']
})
export class AddDisabilitasComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true; kategori; type; isAdd = false;
  @ViewChild('chipList') chipList;
  @ViewChild('resetDisabilitasForm') myNgForm;
  disabilitasForm: FormGroup; model = new CDisabilitas;

  ngOnInit() {
    if (this.data) {
      this.isAdd = false;
      this.disabilitasForm = this.fb.group({
        kategori: [this.data.kategori, [Validators.required]],
      });
      this.kategori = this.data.param.kategori;
      console.log(this.data.param);
    } else {
      this.isAdd = true;
    }
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private disabilitasApi: ApiService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _snackBar: MatSnackBar
  ) {
  }

  /* Reactive book form */
  submitBookForm() {
    this.disabilitasForm = this.fb.group({
      kategori: ['', [Validators.required]]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.disabilitasForm.controls[controlName].hasError(errorName);
  }

  /* Submit book */
  submitDisabilitasForm() {
    if (this.isAdd) {
      if (this.disabilitasForm.valid) {
        this.disabilitasApi.AddDisabilitas(this.disabilitasForm.value).subscribe(res => {
          this._snackBar.openFromComponent(SnackBarComponent, {
            duration: 5 * 1000,
          });
          this.ngZone.run(() => this.router.navigateByUrl('/master/disabilitas'))
        });
      }
    } else {
      console.log(this.data.param, this.data.param.created_at, this.data.param.kategori, this.data.param.id);
      this.model.created_at = this.data.param.created_at;
      this.model.kategori = this.kategori;
      this.model.id = this.data.param.id;
      this.disabilitasApi.UpdateDisabilitas(this.model.id, this.model).subscribe(res => {
        this._snackBar.openFromComponent(SnackBarComponent, {
          duration: 5 * 1000,
        });
        this.ngZone.run(() => this.router.navigateByUrl('/master/disabilitas'))
      });
    }
  }

  back() {
    this.router.navigate(['/master/disabilitas']);
  }
}

@Component({
  selector: 'snack-bar-component',
  templateUrl: 'snack-bar.component.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class SnackBarComponent { }
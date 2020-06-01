import { Component, OnInit, NgZone, ViewChild, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Disabilitas } from 'app/model/disabilitas';

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
  disabilitasForm: FormGroup;

  ngOnInit() {
    if(this.data){
      this.isAdd = false;
        this.disabilitasForm = this.fb.group({
          kategori: [this.data.kategori, [Validators.required]],
        });
        this.kategori = this.data.kategori;
    }else{
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
    @Inject(MAT_DIALOG_DATA) private data: Disabilitas
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
          this.ngZone.run(() => this.router.navigateByUrl('/master/disabilitas'))
        });
      }
    } else {
      var id = this.actRoute.snapshot.paramMap.get('id');
      if (window.confirm('Are you sure you want to update?')) {
        this.disabilitasApi.UpdateDisabilitas(id, this.disabilitasForm.value).subscribe( res => {
          this.ngZone.run(() => this.router.navigateByUrl('/master/disabilitas'))
        });
      }
    }
  }

  back() {
    this.router.navigate(['/master/disabilitas']);
  }
  

}

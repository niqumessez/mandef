import {FormBuilder, Validators} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Component, OnInit, Inject, Input} from '@angular/core';
import {FormsDataService} from '../services/forms-data.service';
import {AppService} from '../../services/app.service';
import {apiRoutes} from '../../app.constants';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  fileForm: FormGroup;
  form_id: number;
  table_data: string;
  formDataId: number;
  selectedFile: File = null;
  hide: boolean = true;
  fileName: string;
  loading: boolean = false;
  @Input() id: string;
  fileLabelName:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private dialogRef: MatDialogRef<FileUploaderComponent>, private formBuilder: FormBuilder,
              private formDataHttp: FormsDataService, private app: AppService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.form_id = this.data['id'];
    this.table_data = this.data['table_data'];
    this.fileLabelName=this.data['file-label'];
    console.log(this.table_data);
    this.fileForm = this.formBuilder.group({
      id: ['', Validators.required],
      file: ['']
    });



   /*  this.formDataHttp.store(this.form_id, this.table_data,"false").subscribe(data => {
      this.formDataId = data['data']['id'];
    }); */

  }

  fileSelected(event) {
    this.hide = false;
    this.selectedFile = <File>event.target.files[0];
    this.fileName = this.selectedFile.name;
  }

  upload() {
    this.loading = true;
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('form_id',this.form_id.toString());
    fd.append('data',this.table_data);
    
    this.http.post(apiRoutes.formsDataFile.store, fd)
      .subscribe(data => {
        setTimeout(() => {
          this.dialogRef.close();
          this.router.navigate(['/auth/custom-forms/form-detail', this.form_id]);
          this.loading = false;
        }, 1000);
      });
  }

  close() {
    this.dialogRef.close();
  }

}

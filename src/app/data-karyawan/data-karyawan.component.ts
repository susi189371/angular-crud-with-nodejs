import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './../services/data-service.service';
import { FormBuilder, FormControl, Validator, FormGroup, Validators, FormArray } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-data-karyawan',
  templateUrl: './data-karyawan.component.html',
  styleUrls: ['./data-karyawan.component.scss']
})
export class DataKaryawanComponent implements OnInit {
  public dataKaryawan;
  public idSelected;
  public dataSelected;
  dataForm: FormGroup;
  submitted = false;
  p: number = 1;
  itemsPerPage: number = 10;

  constructor(private service: DataServiceService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      nama: ['', Validators.required],
      alamat: ['', Validators.required],
      telepon: ['', [Validators.required, Validators.minLength(11)]]
    });

    this.service.getDataKaryawan().subscribe(res => {
      this.dataKaryawan = res;
    })

    this.validasiNumber();

  }

  validasiNumber() {
    $(document).ready(function () {
      $("#telepon ,#teleponEdit").bind({
        keydown: function (e) {
          if (e.shiftKey === true) {

            if (e.which == 9) {
              return true;
            }
            return false;
          }
          if (e.which > 57) {
            return false;
          }

          if (e.which == 32) {
            return false;
          }
          return true;
        }
      });
    });
  }

  select(data) {
    this.validasiNumber();
    this.submitted = false;
    this.dataSelected = data;
    this.idSelected = data._id;
    this.dataForm.get('nama').setValue(this.dataSelected.nama)
    this.dataForm.get('alamat').setValue(this.dataSelected.alamat)
    this.dataForm.get('telepon').setValue(this.dataSelected.telepon)
  }

  add() {
    this.submitted = true;
    if (this.dataForm.invalid) {
      alert('Something error')
      return;
    }

    alert('SUCCESS!!');

    this.service.addDataKaryawan(this.dataForm.value).subscribe(res => {
      this.dataForm.valid;
      this.ngOnInit()
    })
  }


  edit() {
    this.submitted = true;
    var data;
    var nama;
    var alamat;
    var telepon;
    if (this.dataForm.invalid) {
      alert('Something error')
      return;
    }

    alert('SUCCESS!!');

    if (this.dataForm.value.nama != "") {
      nama = this.dataForm.value.nama
    } else {
      nama = this.dataSelected.nama
    }

    if (this.dataForm.value.alamat != "") {
      alamat = this.dataForm.value.alamat
    } else {
      alamat = this.dataSelected.alamat
    }

    if (this.dataForm.value.telepon != "") {
      telepon = this.dataForm.value.telepon
    } else {
      telepon = this.dataSelected.telepon
    }

    data = {
      "nama": nama,
      "alamat": alamat,
      "telepon": telepon
    }

    this.service.editDataKaryawan(this.idSelected, data).subscribe(res => {
      this.dataSelected = null;
      this.ngOnInit()
    })
  }

  delete(id) {
    this.service.deleteDataKaryawan(id).subscribe(res => {
      this.ngOnInit()
    })
  }

  openModal() {
    this.submitted = false;
  }

}

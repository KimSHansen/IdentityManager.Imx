import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ccc-sp-multipleprofitcenters-dialog',
  templateUrl: './sp-multipleprofitcenters-dialog.component.html',
  styleUrls: ['./sp-multipleprofitcenters-dialog.component.scss']
})
export class SpMultipleprofitcentersDialogComponent implements OnInit {

  selectedProfitCenter: string;
  profitcenters: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SpMultipleprofitcentersDialogComponent>
) { }


  ngOnInit(): void {
    this.profitcenters = this.data.profitCenters;
    console.log(this.profitcenters);
  }

  getProfitCenterID(id: string) {
    this.selectedProfitCenter = id;
    console.log('Selected profitcenter ID: ' + id);
  }
  closeDialog() {
    this.dialogRef.close(this.selectedProfitCenter);
  }
}

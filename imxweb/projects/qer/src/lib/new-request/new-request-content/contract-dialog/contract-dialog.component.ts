import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ccc-contract-dialog',
  templateUrl: './contract-dialog.component.html',
  styleUrls: ['./contract-dialog.component.scss']
})
export class ContractDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  contracts: string[];
  selectedContractID: string;

  ngOnInit(): void {
    this.contracts = this.data.contractList;

    console.log(this.contracts);
  }

  getContractID(id: string){
    this.selectedContractID = id;
    console.log("Selected ID: " + this.selectedContractID)
  }

}

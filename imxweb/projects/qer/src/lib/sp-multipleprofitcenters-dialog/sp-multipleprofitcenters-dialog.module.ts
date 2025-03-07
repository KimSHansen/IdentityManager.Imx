import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { SpMultipleprofitcentersDialogComponent } from './sp-multipleprofitcenters-dialog.component';

@NgModule({
  declarations: [SpMultipleprofitcentersDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    TranslateModule
  ],
  exports: [SpMultipleprofitcentersDialogComponent]
})
export class SpMultipleprofitcentersDialogModule { }
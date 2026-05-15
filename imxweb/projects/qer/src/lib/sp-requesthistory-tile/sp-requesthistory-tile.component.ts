import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
 standalone: false,
 selector: 'ccc-sp-requesthistory-tile',
 templateUrl: './sp-requesthistory-tile.component.html',
 styleUrls: ['./sp-requesthistory-tile.component.scss'],
})
export class SpRequesthistoryTileComponent implements OnInit {
 constructor(public readonly router: Router) {}
 ngOnInit(): void {}
 public openRequestHistory():  void {
   this.router.navigate(['requesthistory']);
 }
}
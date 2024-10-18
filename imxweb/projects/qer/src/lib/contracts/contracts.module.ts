import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContractsComponent } from './user-contracts/user-contracts.component';
import { MenuService } from 'qbm'
import { UserTileComponentComponent } from './user-tile-component/user-tile-component.component';
import { TilesModule } from './../tiles/tiles.module';
import { MatButtonModule } from '@angular/material/button';
import { Title } from '@angular/platform-browser';


@NgModule({
  declarations: [
    UserContractsComponent,
    UserTileComponentComponent
  ],
  imports: [
    CommonModule,
    TilesModule,
    MatButtonModule
  ],
  exports: [
    UserContractsComponent,
    UserTileComponentComponent
  ]
})
export class ContractsModule { 

constructor(private readonly menuService: MenuService){
  this.setupMenu();
}

private setupMenu(): void {
  this.menuService.addMenuFactories(
   
    (preProps: string[], __: string[]) => {
      return {
        id: 'ROOT_CONTRACTS',
        title: '#LDS#Contracts',
        sorting: '60',
        items: [{
          id: 'CONTRACTS_SELECT',
          route: 'contracts',
          title: '#LDS#Contracts'
        }
        ],
      };
    }  
  );
}
}
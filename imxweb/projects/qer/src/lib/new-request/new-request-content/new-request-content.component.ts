/*
 * ONE IDENTITY LLC. PROPRIETARY INFORMATION
 *
 * This software is confidential.  One Identity, LLC. or one of its affiliates or
 * subsidiaries, has supplied this software to you under terms of a
 * license agreement, nondisclosure agreement or both.
 *
 * You may not copy, disclose, or use this software except in accordance with
 * those terms.
 *
 *
 * Copyright 2023 One Identity LLC.
 * ALL RIGHTS RESERVED.
 *
 * ONE IDENTITY LLC. MAKES NO REPRESENTATIONS OR
 * WARRANTIES ABOUT THE SUITABILITY OF THE SOFTWARE,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT.  ONE IDENTITY LLC. SHALL NOT BE
 * LIABLE FOR ANY DAMAGES SUFFERED BY LICENSEE
 * AS A RESULT OF USING, MODIFYING OR DISTRIBUTING
 * THIS SOFTWARE OR ITS DERIVATIVES.
 *
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

import { PortalServicecategories } from 'imx-api-qer';
import { EntityCollectionData, EntityData, IWriteValue, MethodDescriptor, MultiValue } from 'imx-qbm-dbts';

import { ImxTranslationProviderService, LdsReplacePipe, AppConfigService } from 'qbm';
import { NewRequestOrchestrationService } from '../new-request-orchestration.service';
import { NewRequestPeerGroupComponent } from '../new-request-peer-group/new-request-peer-group.component';
import { NewRequestProductComponent } from '../new-request-product/new-request-product.component';
import { NewRequestReferenceUserComponent } from '../new-request-reference-user/new-request-reference-user.component';
import { NewRequestProductBundleComponent } from '../new-request-product-bundle/new-request-product-bundle.component';
import { NewRequestTabModel } from '../new-request-tab/new-request-tab-model';
import { EuiSidesheetService } from '@elemental-ui/core';
import { TranslateService } from '@ngx-translate/core';
import { NewRequestSelectedProductsComponent } from '../new-request-selected-products/new-request-selected-products.component';
import { SelectedProductItem } from '../new-request-selected-products/selected-product-item.interface';
import { NewRequestSelectionService } from '../new-request-selection.service';
import { NewRequestAddToCartService } from '../new-request-add-to-cart.service';
import { ProjectConfigurationService } from '../../project-configuration/project-configuration.service';
//import { MatDialog } from '@angular/material/dialog';
//import { V2Client, TypedClient } from 'imx-api-ccc';

@Component({
  selector: 'imx-new-request-content',
  templateUrl: './new-request-content.component.html',
  styleUrls: ['./new-request-content.component.scss'],
})
export class NewRequestContentComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private selectedTab: NewRequestTabModel;

  public navLinks: NewRequestTabModel[] = [];
  public catSlider: MatSlideToggle;
  public showCatSlider = false;
  public selectedCategory: PortalServicecategories;
  public peerGroupEnabled = true;
  //v2Client: V2Client;
  //typedClient: TypedClient;

  constructor(
    private readonly appConfig: AppConfigService,
    public readonly orchestration: NewRequestOrchestrationService,
    public readonly selectionService: NewRequestSelectionService,
    private readonly addToCartService: NewRequestAddToCartService,    
    private readonly projectConfigService: ProjectConfigurationService,
    private readonly ldsReplace: LdsReplacePipe,
    private readonly router: Router,
    private readonly sidesheetService: EuiSidesheetService,
    private readonly translate: TranslateService,
    //public dialog: MatDialog,
    private readonly translationProvider: ImxTranslationProviderService,
  ) {
    
    // const schemaProvider = appConfig.client;
    // this.v2Client = new V2Client(appConfig.apiClient, schemaProvider);
    // this.typedClient = new TypedClient(this.v2Client, this.translationProvider);

    this.navLinks.push({
      id: 0,
      title: '#LDS#Heading All Products',
      component: NewRequestProductComponent,
      link: 'allProducts',
      active: true,
    });

    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.orchestration.selectedTab = this.navLinks.find((tab) => `/newrequest/${tab.link}` === this.router.url);
          this.orchestration.selectedTab?.component === NewRequestProductComponent
            ? (this.showCatSlider = true)
            : (this.showCatSlider = false);
        }
      })
    );

    this.subscriptions.push(
      this.orchestration.selectedCategory$.subscribe(
        (selectedCategory: PortalServicecategories) => (this.selectedCategory = selectedCategory)
      )
    );
    this.subscriptions.push(
      this.orchestration.recipients$.subscribe((recipients: IWriteValue<string>) => {
        this.peerGroupEnabled = MultiValue.FromString(recipients.value).GetValues().length === 1 ? true : false;

        if (this.selectedTab && this.selectedTab.link === 'productsByPeerGroup' && !this.peerGroupEnabled) {
          this.router.navigate(['/newrequest']);
        }
      })
    );
  }

  public async ngOnInit(): Promise<void> {
    const projectConfig = await this.projectConfigService.getConfig();
    const canSelectFromTemplate = projectConfig.ITShopConfig.VI_ITShop_ProductSelectionFromTemplate;
    const canSelectByRefUser = projectConfig.ITShopConfig.VI_ITShop_ProductSelectionByReferenceUser;
    

    if (canSelectByRefUser) {
      this.navLinks.push({
        id: 1,
        title: '#LDS#Heading Recommended Products',
        component: NewRequestPeerGroupComponent,
        link: 'productsByPeerGroup',
        active: false,
      });
      this.navLinks.push({
        id: 2,
        title: '#LDS#Heading Products by Reference User',
        component: NewRequestReferenceUserComponent,
        link: 'productsByReferenceUser',
        active: false,
      });
    }
    if (canSelectFromTemplate) {
      this.navLinks.push({
        id: 3,
        title: '#LDS#Heading Product Bundles',
        component: NewRequestProductBundleComponent,
        link: 'productBundles',
        active: false,
      });
    }    
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  public onSelectedTabChange(selectedTab: NewRequestTabModel): void {
    this.selectedTab = selectedTab;
    this.orchestration.selectedTab = selectedTab;
  }

  public onCatSliderChanged(event: MatSlideToggleChange): void {
    this.orchestration.includeChildCategories = event.checked;
  }

  public async openSelected(): Promise<void> {
    const sidesheetRef = this.sidesheetService.open(NewRequestSelectedProductsComponent, {
      title: this.ldsReplace.transform(
        await this.translate.get('#LDS#Heading View Selected Products ({0})').toPromise(),
        this.selectionService.selectedProducts.length
      ),
      width: '800px',
      testId: 'new-request-selected-sidesheet',
      padding: '0px',
      disableClose: true,
      data: {
        candidates: this.selectionService.selectedProducts,
      },
    });

    sidesheetRef.afterClosed().subscribe((result: SelectedProductItem[]) => {
      if (!result) {
        return;
      }

      this.selectionService.selectedProducts = result;
      this.selectionService.selectedProducts$.next(result);
    });
  }

  public deselectCandidates(): void {
    this.selectionService.clearProducts();
  }

  // public async pushCandidatesToCart(): Promise<void> {

  //   const recipientsUids = MultiValue.FromString(this.orchestration.recipients.value).GetValues();
  //   //let dialogRef //<SpMultipleprofitcentersDialogComponent, any>

  //   for (const uidRecipient of recipientsUids) {
  //     let profitCenterList = [];
      
  //     let a = this.ProfitCenters(uidRecipient, profitCenterList);
      
  //     const dialogRef = this.dialog.open(SpMultipleprofitcentersDialogComponent, {
  //     //width: '250px',
  //     data: {profitCenters: profitCenterList}
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result == "" || result == undefined){
  //       return;
  //     }
  //   console.log('pushCandidatesToCart: ' + result);
  //    // const id = result;
  //   });
  //   this.addToCartService.addItemsToCart();
  // }
  // }

  public async pushCandidatesToCart(): Promise<void> {
    // const recipientsUids = MultiValue.FromString(this.orchestration.recipients.value).GetValues();
    
    // for (const uidRecipient of recipientsUids) {
    //   let profitCenterList: ProfitCenterObject[] = [];
      
    //   await this.ProfitCenters(uidRecipient, profitCenterList);
      
    //   const dialogRef = this.dialog.open(SpMultipleprofitcentersDialogComponent, {
    //     data: { profitCenters: profitCenterList }
    //   });
  
    //   const result = await dialogRef.afterClosed().toPromise();
      
    //   if (result == "" || result == undefined) {
    //     return;
    //   }
  
    //   console.log('pushCandidatesToCart: ' + result);
    // }
  
    this.addToCartService.addItemsToCart();
  }
  

  //  public async ProfitCenters(uidRecipient: string, profitCenterList: any[]): Promise<ProfitCenterObject> {
  //    //const data = await this.v2Client.portal_Employments_get();
  //    const data = await this.typedClient.PortalGetemployments.Get(uidRecipient);//'1f4d133e-18b5-4baa-ac36-b2788263485a'); //this.v2Client.portal_GetEmployments_get('1f4d133e-18b5-4baa-ac36-b2788263485a');
  //    //this.profitCenterList.push(data);
  //   //this.profitCenters.push(data[0].);
  //   if (data.totalCount > 1) {
  //     console.log('User have more than one profitcenter');
  //   }
  
  //   for(let item of data.Data){
    
  //   profitCenterList.push({
  //      ShortName: item.GetEntity().GetColumn('ShortName').GetValue(),
  //      AccountNumber: item.GetEntity().GetColumn('AccountNumber').GetValue(),
  //      UID_Person: item.GetEntity().GetColumn('UID_Person').GetValue(),
  //      UID_ProfitCenter: item.GetEntity().GetColumn('UID_ProfitCenter').GetValue()});
  //  }
  //    return;
  //  }
  
  }

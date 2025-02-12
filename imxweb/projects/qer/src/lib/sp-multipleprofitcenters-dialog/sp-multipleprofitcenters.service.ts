import { Injectable } from '@angular/core';
import { AppConfigService, ImxTranslationProviderService } from 'qbm';
import { MatDialog } from '@angular/material/dialog';
import { PWOProfitCenterChangeReturnObject, PWOProfitCenterChangePostedObject, TypedClient, V2Client, V2ApiClientMethodFactory } from 'imx-api-ccc';
import { SpMultipleprofitcentersDialogComponent } from './sp-multipleprofitcenters-dialog.component';
import { SPProfitCenterObject } from './sp-profit-center-object';
import { RequestableProduct } from  '../shopping-cart/requestable-product.interface';

@Injectable({
  providedIn: 'root'
})
export class SpMultipleprofitcentersService {
  v2Client: V2Client;
  typedClient: TypedClient;

  constructor(
    private dialog: MatDialog,    
    private readonly appConfig: AppConfigService,
    private readonly translationProvider: ImxTranslationProviderService,
  ) {
    const schemaProvider = appConfig.client;
    this.v2Client = new V2Client(appConfig.apiClient, schemaProvider);
    this.typedClient = new TypedClient(this.v2Client, this.translationProvider);


  }

  public async selectProfitCenter(uidPerson: string, requestable: RequestableProduct): Promise<string | undefined> {
    let profitCenterList: SPProfitCenterObject[] = [];
    
    await this.ProfitCenters(uidPerson, profitCenterList);
    
    if (profitCenterList.length == 1) {
      return profitCenterList[0].UID_ProfitCenter;
     }

    const dialogRef = this.dialog.open(SpMultipleprofitcentersDialogComponent, {
      data: { 
        profitCenters: profitCenterList,
        DisplayProduct: requestable.Display,
        DisplayPerson: requestable.DisplayRecipient
      }
    });

    const result = await dialogRef.afterClosed().toPromise();
    
    if (result == "" || result == undefined) {
      return undefined;
    }
    console.log('sp-multipleprofitcenters.service.ts: ' + result);
    return result;
  }

  public async updatePWOProfitCenter(uidPersonWantsOrg: string, uidProfitCenter: string): Promise<PWOProfitCenterChangeReturnObject | undefined>{
    let post: PWOProfitCenterChangePostedObject = {UID_PersonWantsOrg: uidPersonWantsOrg, UID_ProfitCenter: uidProfitCenter};
 
    
   const data = await this.v2Client.portal_spcustom_personwantsorg_profitcenterchange_post(post);
    return data;
  }

  private async ProfitCenters(uidPerson: string, profitCenterList: SPProfitCenterObject[]): Promise<void> {
    const data = await this.typedClient.PortalSpcustomGetemployments.Get(uidPerson);
    for (let item of data.Data) {
      profitCenterList.push({
        ShortName: item.GetEntity().GetColumn('ShortName').GetValue(),
        AccountNumber: item.GetEntity().GetColumn('AccountNumber').GetValue(),
        UID_Person: item.GetEntity().GetColumn('UID_Person').GetValue(),
        UID_ProfitCenter: item.GetEntity().GetColumn('UID_ProfitCenter').GetValue()
      });
    }
  }
}

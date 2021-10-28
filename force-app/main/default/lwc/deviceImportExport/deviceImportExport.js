import { LightningElement, api, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Case_Object from '@salesforce/schema/Case';
import DEVICE_FIELD from '@salesforce/schema/Case.Device__c';
import STORE_FIELD from '@salesforce/schema/Case.Store__c';
import ACCOUNT_FIELD from '@salesforce/schema/Case.AccountId';
import QUANTITY_FIELD from '@salesforce/schema/Case.Quantity__c';
import ORIGIN_FIELD from '@salesforce/schema/Case.Origin';

export default class DeviceImportExport extends LightningElement {
  // Pass-in Prop
  @api device;
  @api isImport;

  // Init Attribute
  recordTypeId;
  recordTypeName;
  objectApiName = Case_Object;
  fields;
  
  // Wire Attribute
  @wire(getObjectInfo, { objectApiName: Case_Object })
  handleObjectInfo({ error, data }) {
    if (data) {
      const rtis = data.recordTypeInfos;
      this.recordTypeName = this.isImport ? 'Import' : 'Export';
      this.recordTypeId = Object.keys(rtis).find(rti => rtis[rti].name === this.recordTypeName);
      if(this.isImport) {
        this.fields = [DEVICE_FIELD, STORE_FIELD, QUANTITY_FIELD, ORIGIN_FIELD];
      } else {
        this.fields = [DEVICE_FIELD, ACCOUNT_FIELD, QUANTITY_FIELD, ORIGIN_FIELD];
      }
    }
  }


  handleSuccess(event) {
    const evt = new ShowToastEvent({
      title: 'Account created',
      message: 'Record ID: ' + event.detail.id,
      variant: 'success',
    });
    this.dispatchEvent(evt);
    this.dispatchEvent(new CustomEvent('closepopup'));
  }

  handleError(event) {
    this.dispatchEvent(new CustomEvent('closepopup'));
  }

  handleClosePopup() {
    this.dispatchEvent(new CustomEvent('closepopup'));
  }
}
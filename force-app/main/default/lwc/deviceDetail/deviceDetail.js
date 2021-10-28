import { LightningElement, track, wire } from 'lwc';
import { subscribe, publish, MessageContext } from 'lightning/messageService';
import resources from '@salesforce/resourceUrl/TechnologyPark';
import DEVICE_DETAIL_CHANNEL from '@salesforce/messageChannel/Device_Detail__c';
import DEVICE_COMPARE_CHANNEL from '@salesforce/messageChannel/Device_Compare__c';

export default class DeviceDetail extends LightningElement {
  // Init attribute
  device = {};
  haveDevice = false;
  imageUrl = '';
  isImport;
  openImportExportPopup = false;
  
  // Wire attribute
  @wire(MessageContext)
  messageContext;


  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  subscribeToMessageChannel() {
    this.subscription = subscribe(
      this.messageContext,
      DEVICE_DETAIL_CHANNEL,
      (message) => {
        this.device = message.data;
        this.haveDevice = true;
        this.imageUrl = this.device ? `${resources}/img/${this.device.Name.replaceAll(" ", "_")}.png` : '';
      }
    );
  }

  handleCompare() {
    let payload = {
      openComparePopup: true,
      data: this.device
    };
    publish(this.messageContext, DEVICE_COMPARE_CHANNEL, payload);
  }
  
  handleImport() {
    this.isImport = true;
    this.openImportExportPopup = true;
  }
  
  handleExport() {
    this.isImport = false;
    this.openImportExportPopup = true;
  }

  handleClosePopup() {
    this.openImportExportPopup = false;
  }
}
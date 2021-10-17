import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import getAllBrands from '@salesforce/apex/TechnologyParkController.getAllBrands';
import getAllDevices from '@salesforce/apex/TechnologyParkController.getAllDevices';
import DEVICE_COMPARE_CHANNEL from '@salesforce/messageChannel/Device_Compare__c';

export default class TechnologyParkMainComponent extends LightningElement {
  @wire(getAllBrands)
  listBrand;
  @wire(getAllDevices, { brandId: '$selectedBrandId' })
  listDevice;
  @wire(MessageContext)
  messageContext;

  selectedBrandId = 'All';
  openComparePopup = false;
  compareDevice = {};

  connectedCallback() {
    this.subscribeToMessageChannel();
  }
  subscribeToMessageChannel() {
    this.subscription = subscribe(
      this.messageContext,
      DEVICE_COMPARE_CHANNEL,
      (message) => this.handleMessage(message)
    );
  }
  handleMessage(message) {
    this.compareDevice = message.data;
    this.openComparePopup = message.openComparePopup;
  }
  handleClick(event) {
    let selectedBrandLabel = event.target.label;
    if(selectedBrandLabel == 'All') {
      this.selectedBrandId = selectedBrandLabel;
    } else {
      this.selectedBrandId = this.listBrand.data.filter(e => e.Name == selectedBrandLabel)[0].Id
    }
  }
  handleClosePopup() {
    this.openComparePopup = false;
  }
}
import { LightningElement, wire } from 'lwc';
import { subscribe, publish, MessageContext } from 'lightning/messageService';
import resources from '@salesforce/resourceUrl/TechnologyPark';
import DEVICE_DETAIL_CHANNEL from '@salesforce/messageChannel/Device_Detail__c';
import DEVICE_COMPARE_CHANNEL from '@salesforce/messageChannel/Device_Compare__c';

export default class DeviceDetail extends LightningElement {
  device = {};
  @wire(MessageContext)
  messageContext;
  imageUrl = '';
  quantityImport;
  quantityExport;

  connectedCallback() {
    this.subscribeToMessageChannel();
  }
  subscribeToMessageChannel() {
    this.subscription = subscribe(
      this.messageContext,
      DEVICE_DETAIL_CHANNEL,
      (message) => this.handleMessage(message)
    );
  }
  handleMessage(message) {
    this.device = message.data;
    this.imageUrl = this.device ? `${resources}/img/${this.device.Name.replaceAll(" ", "_")}.png` : '';
  }
  handleCompare() {
    let payload = {
      openComparePopup: true,
      data: this.device
    };
    publish(this.messageContext, DEVICE_COMPARE_CHANNEL, payload);
  }
  handleAmountChange(event) {
    let name = event.target.name;
    let value = event.detail.value;
    this[name] = value;
  }
  handleImport() {
    alert('Import quantity:' + this.quantityImport);
  }
  handleExport() {
    alert('Export quantity:' + this.quantityExport);
  }
}
import {  LightningElement, api, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import resources from '@salesforce/resourceUrl/TechnologyPark';
import DEVICE_DETAIL_CHANNEL from '@salesforce/messageChannel/Device_Detail__c';

export default class DeviceTile extends LightningElement {
  @api device;
  @wire(MessageContext)
  messageContext;
  imageUrl = '';
  connectedCallback() {
    this.imageUrl = this.device ? `${resources}/img/${this.device.Name.replaceAll(" ", "_")}.png` : '';
  }

  handleOpenRecordClick() {
    let payload = {
      data: this.device
    };
    publish(this.messageContext, DEVICE_DETAIL_CHANNEL, payload);
  }
}
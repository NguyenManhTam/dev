import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import getAllBrands from '@salesforce/apex/TechnologyParkController.getAllBrands';
import getAllDevices from '@salesforce/apex/TechnologyParkController.getAllDevices';
import DEVICE_COMPARE_CHANNEL from '@salesforce/messageChannel/Device_Compare__c';

export default class TechnologyParkMainComponent extends LightningElement {
  // Init attribute
  deviceName = '';
  selectedBrandId = 'All';
  openComparePopup = false;
  compareDevice = {};
  priceRangeValue = '0-All';
  priceRangeOptions = [
    { label: 'All', value: '0-All' },
    { label: '<200', value: '0-199' },
    { label: '200-400', value: '200-400' },
    { label: '400-600', value: '400-600' },
    { label: '>600', value: '601-All' },
  ];

  // Wire attribute
  @wire(getAllBrands)
  listBrand;
  @wire(getAllDevices, { deviceName: '$deviceName',brandId: '$selectedBrandId', priceRange: '$priceRangeValue' })
  listDevice;
  @wire(MessageContext)
  messageContext;


  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  subscribeToMessageChannel() {
    this.subscription = subscribe(
      this.messageContext,
      DEVICE_COMPARE_CHANNEL,
      (message) => {
        this.compareDevice = message.data;
        this.openComparePopup = message.openComparePopup;
      }
    );
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.detail.value;
    this[name] = value;
  }

  handleSelectBrand(event) {
    let selectedBrandLabel = event.target.label;
    if (selectedBrandLabel == 'All') {
      this.selectedBrandId = selectedBrandLabel;
    } else {
      this.selectedBrandId = this.listBrand.data.filter(e => e.Name == selectedBrandLabel)[0].Id
    }
  }

  handleSelectRange(event) {
    this.priceRangeValue = event.detail.value;
  }

  handleClosePopup() {
    this.openComparePopup = false;
  }
}
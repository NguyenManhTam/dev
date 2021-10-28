import { LightningElement, api } from 'lwc';
import resources from '@salesforce/resourceUrl/TechnologyPark';

export default class DeviceCompare extends LightningElement {
  // Pass-in prop
  @api compareDevice;
  @api allDevice;

  // Init Attribute
  compareDeviceImageUrl = '';
  selectedDevice = {};
  selectedDeviceImageUrl = '';

  get options() {
    let listOption = [{ label: '', value: '' }];
    this.allDevice.forEach(element => {
      let option = {
        label: element.Name,
        value: element.Id
      };
      listOption.push(option);
    });
    return listOption;
  }

  connectedCallback() {
    this.compareDeviceImageUrl = `${resources}/img/${this.compareDevice.Name.replaceAll(" ", "_")}.png`;
  }

  handleChange(event) {
    let id = event.detail.value;
    if(id) {
      this.value = id;
      let device = this.allDevice.filter(e => e.Id == id)[0];
      this.selectedDevice = device;
      this.selectedDeviceImageUrl =  `${resources}/img/${device.Name.replaceAll(" ", "_")}.png`;
    } else {
      this.value = '';
      this.selectedDevice = {};
      this.selectedDeviceImageUrl = '';
    }
  }
  
  handleClosePopup() {
    this.dispatchEvent(new CustomEvent('closepopup'));
  }
}
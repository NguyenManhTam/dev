import { createElement } from 'lwc';
import DeviceDetail from 'c/DeviceDetail';

describe('c-device-detail', () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('displays device', () => {
    const element = createElement('c-device-detail', {
      is: DeviceDetail
    });
    expect(element.device).toBe({});
  });
});
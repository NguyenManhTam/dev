@isTest
public  class TechnologyParkControllerTest {
    @testSetup
    private static void setupData() {
        Brand__c brand = new Brand__c(Name='Brand');
        insert brand;
        Device__c device1 = new Device__c();
        device1.Name = 'Device1';
        device1.Brand__c = brand.Id;
        device1.Processor__c = 'Processor';
        device1.Display__c = 'Display';
        device1.RAM__c = 4;
        device1.Storage__c = 64;
        device1.Price__c = 100;
        device1.Quantity__c = 123;
        insert device1;
    }

    @isTest public static void testGetAllBrands() {
        List<Brand__c> brands = new List<Brand__c>();
        brands = TechnologyParkController.getAllBrands();
        System.assertNotEquals(0, brands.size());
    }

    @isTest public static void testGetAllDevices() {
        List<Device__c> devices = new List<Device__c>();
        devices = TechnologyParkController.getAllDevices('All');
        System.assertNotEquals(0, devices.size());
        List<Brand__c> brands = [SELECT Id FROM Brand__c];
        devices = TechnologyParkController.getAllDevices(brands[0].Id);
        System.assertNotEquals(0, devices.size());
    }
}
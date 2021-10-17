public with sharing class TechnologyParkController {
  @AuraEnabled(cacheable=true)
  public static List<Brand__c> getAllBrands(){
    try {
      // Use SOQL to query all brand record
      List<Brand__c> result = new List<Brand__c>();
      if(Schema.sObjectType.Brand__c.isAccessible()) {
        result = [SELECT Id, Name FROM Brand__c];
      }
      return result;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled(cacheable=true)
  public static List<Device__c> getAllDevices(String brandId){
    try {
      // Use SOQL to query all device record on brand Id
      List<Device__c> result = new List<Device__c>();
      if(Schema.sObjectType.Device__c.isAccessible()) {
        if(brandId.equals('All')) {
          result = [
            SELECT Id, Name, Brand__c, Brand__r.Name, Store__c, Processor__c, Display__c, RAM__c, Storage__c, Quantity__c, Price__c
            FROM Device__c
          ];
        } else {
          result = [
            SELECT Id, Name, Brand__c, Brand__r.Name, Store__c, Processor__c, Display__c, RAM__c, Storage__c, Quantity__c, Price__c
            FROM Device__c 
            WHERE Brand__c =: brandId
          ];
        }
      }
      return result;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
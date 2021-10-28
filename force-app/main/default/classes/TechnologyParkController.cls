public with sharing class TechnologyParkController {
  @AuraEnabled(cacheable=true)
  public static List<Brand__c> getAllBrands(){
    try {
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
  public static List<Device__c> getAllDevices(String deviceName, String brandId, String priceRange) {
    try {
      List<Device__c> result = new List<Device__c>();
      if(Schema.sObjectType.Device__c.isAccessible()) {
        String query = 'SELECT Id, Name, Brand__c, Brand__r.Name, Store__c,' +
                        'Processor__c, Display__c, RAM__c, Storage__c, Quantity__c, Price__c ' +
                        'FROM Device__c';
        List<String> range = priceRange.split('-');
        String min = range[0];
        String max = range[1];
        if(brandId.equals('All')) {
          query = query + ' WHERE';
        } else {
          query = query + ' WHERE Brand__c =: brandId AND ';
        }

        Integer minValue = Integer.valueOf(min);
        query = query + ' Price__c >= :minValue';
        if(max != 'All') {
          Integer maxValue = Integer.valueOf(max);
          query = query + ' AND Price__c <= :maxValue';
        }
        
        for(Device__c dev : Database.query(query)) {
          if(String.isBlank(deviceName) || dev.Name.containsIgnoreCase(deviceName)) {
            result.add(dev);
          }
        }
      }
      return result;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
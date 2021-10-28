public without sharing class CommonUtil {
    public static String getRecordTypeIdByObject(String sobjectType, String developerName) {
        List<RecordType> recordTypes = [SELECT Id, DeveloperName, SobjectType
                                        FROM RecordType
                                        WHERE SobjectType =: sobjectType AND DeveloperName = :developerName];
        if(!recordTypes.isEmpty()) {
            return recordTypes[0].Id;
        }
        return null;
    }
}
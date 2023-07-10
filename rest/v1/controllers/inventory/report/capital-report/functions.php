<?php

// REPORT FILTER SALES
// if all member, all supplier, all category, product by id 
function checkReadReportCapital($object)
{
    $query = $object->readReportCapital();
    checkQuery($query, "Empty records. (read report filter detailed capital share)");
    return $query;
}

// REPORT FILTER SALES
// if all member, all supplier, all category, product by id 
function checkReadReportCapitalByMemberId($object)
{
    $query = $object->readReportCapitalByMemberId();
    checkQuery($query, "Empty records. (read report filter detailed capital share by member id)");
    return $query;
}

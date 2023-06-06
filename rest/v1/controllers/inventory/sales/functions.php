<?php

// Read limit
function checkReadLimitById($object)
{
    $query = $object->readLimitById();
    checkQuery($query, "Empty records. (limit by id)");
    return $query;
}

// Create 
function checkCreateSales($object)
{
    $query = $object->createSales();
    checkQuery($query, "There's a problem processing your request. (create sales)");
    return $query;
}

// Active 
function checkIsPaidOrder($object)
{
    $query = $object->isPaidOrder();
    checkQuery($query, "There's a problem processing your request. (sales is pending)");
    return $query;
}

// Read limit
function checkReadReportTopSellerByMonthLimit($object)
{
    $query = $object->readReportTopSellerByMonthLimit();
    checkQuery($query, "Empty records. (read limit report top seller by month)");
    return $query;
}
// Read 
function checkReadReportTopSellerByMonth($object)
{
    $query = $object->readReportTopSellerByMonth();
    checkQuery($query, "Empty records. (read report top seller by month)");
    return $query;
}

<?php


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

// Read 
function checkReadAllPendingPaidByMonth($object)
{
    $query = $object->readAllPendingPaidByMonth();
    checkQuery($query, "Empty records. (read all pending and paid by month)");
    return $query;
}

// Read 
function checkReadAllPendingByYear($object)
{
    $query = $object->readAllPendingByYear();
    checkQuery($query, "Empty records. (read all pending )");
    return $query;
}

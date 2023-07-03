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
// Read 
function checkReadAllPendingPaidByMonth($object)
{
    $query = $object->readAllPendingPaidByMonth();
    checkQuery($query, "Empty records. (read all pending and paid by month)");
    return $query;
}
// Report Read filter sales
function checkReadReportFilterSales($object)
{
    $query = $object->readReportFilterSales();
    checkQuery($query, "Empty records. (read report filter sales)");
    return $query;
}
// Read 
function checkReadReportAllProductFilterSalesByCategory($object)
{
    $query = $object->readReportAllProductFilterSalesByCategory();
    checkQuery($query, "Empty records. (read report all product filter sales by category)");
    return $query;
}
// Read 
function checkReadReportAllProductFilterSalesBySupplierProduct($object)
{
    $query = $object->readReportAllProductFilterSalesBySupplierProduct();
    checkQuery($query, "Empty records. (read report all product filter sales by product and supplier)");
    return $query;
}

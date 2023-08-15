<?php

// Read limit By Id
function checkReadAllInvoice($object)
{
    $query = $object->readAllInvoice();
    checkQuery($query, "Empty records. (Read all invoice limit)");
    return $query;
}
// Read limit By Id
function checkReadAllInvoiceLimit($object)
{
    $query = $object->readAllInvoiceLimit();
    checkQuery($query, "Empty records. (Read all invoice)");
    return $query;
}
// Read search
function checkSearchAllMemberInvoice($object)
{
    $query = $object->searchAllMemberInvoice();
    checkQuery($query, "Empty records. (search)");
    return $query;
}
// Read limit By Id
function checkReadLimitById($object)
{
    $query = $object->readLimitById();
    checkQuery($query, "Empty records. (limit by id)");
    return $query;
}
// Read limit By Id
function checkReadAllPendingByMemberId($object)
{
    $query = $object->readAllPendingByMemberId();
    checkQuery($query, "Empty records. (pending order by member id)");
    return $query;
}
// Read all pending order
function checkReadAllPendingOrder($object)
{
    $query = $object->readAllPendingOrder();
    checkQuery($query, "Empty records. (read all pending order.)");
    return $query;
}

// Create sales
function checkCreateSales($object)
{
    $query = $object->createSales();
    checkQuery($query, "There's a problem processing your request. (create sales)");
    return $query;
}


// Update sales
function checkUpdateSales($object)
{
    $query = $object->updateSales();
    checkQuery($query, "There's a problem processing your request. (update sales)");
    return $query;
}

// Create 
function checkDeleteSales($object)
{
    $query = $object->deleteSales();
    checkQuery($query, "There's a problem processing your request. (create sales)");
    return $query;
}

// Read by product id
function checkReadAllGroupByProductNumber($object)
{
    $query = $object->readAllGroupByProductNumber();
    checkQuery($query, "Empty records. (Read All group by product number)");
    return $query;
}
// check Search Product 
function checkSearchProduct($object)
{
    $query = $object->searchProduct();
    checkQuery($query, "Empty records. (search produc)");
    return $query;
}

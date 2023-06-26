<?php

// Read limit
function checkReadByIdLimit($object)
{
    $query = $object->readByIdLimit();
    checkQuery($query, "Empty records. (read by id limit)");
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
// Update sales
function checkSalesPaymentUpdate($object)
{
    $query = $object->updateSalesPaymentUpdate();
    checkQuery($query, "There's a problem processing your request. (update sales payment)");
    return $query;
}

// Active 
function checkIsPaidOrder($object)
{
    $query = $object->isPaidOrder();
    checkQuery($query, "There's a problem processing your request. (sales is pending)");
    return $query;
}

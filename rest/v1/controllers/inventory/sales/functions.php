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

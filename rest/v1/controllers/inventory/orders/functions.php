<?php

// Read limit By Id
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

<?php

// Read by product id
function checkReadAllGroupByProductNumber($object)
{
    $query = $object->readAllGroupByProductNumber();
    checkQuery($query, "Empty records. (Read All group by product number)");
    return $query;
}

// Create Barcode
function checkCreateBarcode($object)
{
    $query = $object->createBarcode();
    checkQuery($query, "There's a problem processing your request. (create barcode)");
    return $query;
}

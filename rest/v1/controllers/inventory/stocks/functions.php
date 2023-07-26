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

// check barcode
function isBarcodeExist($object, $barcode)
{
    $query = $object->checkBarcode();
    $count = $query->rowCount();
    checkExistence($count, "{$barcode} already exist.");
}

// check barcode In Stocks 
function checkReadAllBarcode($object)
{
    $query = $object->readAllBarcode();
    checkQuery($query, "There's a problem processing your request. (read barcode)");
    return $query;
}

// compare barcode
function compareBarcode($object, $barcode_old, $barcode)
{
    if (strtolower($barcode_old) !=  strtolower($barcode)) {
        isBarcodeExist($object, $barcode);
    }
}

// Update Barcode 
function checkUpdateBarcode($object)
{
    $query = $object->updateBarcode();
    checkQuery($query, "There's a problem processing your request. (update Barcode)");
    return $query;
}

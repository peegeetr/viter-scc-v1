<?php

// Read all Summary
function checkReadBySupplierId($object)
{
    $query = $object->readBySupplierId();
    checkQuery($query, "Empty records.(Read by supplier id)");
    return $query;
}

// Read all Summary
function checkReadBySupplierIdLimit($object)
{
    $query = $object->readBySupplierIdLimit();
    checkQuery($query, "Empty records.(Read by supplier id limit)");
    return $query;
}

// Update 
function checkUpdateSccPrice($object)
{
    $query = $object->updateSccPrice();
    checkQuery($query, "There's a problem processing your request. (update price)");
    return $query;
}

// Read all Summary
function checkReadByCategoryid($object)
{
    $query = $object->readByCategoryid();
    checkQuery($query, "Empty records.(Read by category id)");
    return $query;
}

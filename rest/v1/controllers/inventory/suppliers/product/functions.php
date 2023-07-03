<?php

// Read category by category id
function checkReadSupplierCategoryByCategoryId($object)
{
    $query = $object->readSupplierCategoryByCategoryId();
    checkQuery($query, "Empty records.(Read by category id)");
    return $query;
}

// Read category by supplier id
function checkReadCategoryBySupplierId($object)
{
    $query = $object->readCategoryBySupplierId();
    checkQuery($query, "Empty records.(Read by supplier id)");
    return $query;
}

// Read product by supplier id and category
function checkReadSupplierCategoryBySupplierId($object)
{
    $query = $object->readSupplierCategoryBySupplierId();
    checkQuery($query, "Empty records.(Read by supplier id)");
    return $query;
}

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

// check association
function isAssociatedInOrder($object)
{
    $query = $object->checkAssociationInOrder();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete this item because it is already associated with other module.");
}

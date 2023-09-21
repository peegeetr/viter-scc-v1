<?php

// Create 
function checkCreateHistoryPrice($object)
{
    $query = $object->createHistoryPrice();
    checkQuery($query, "There's a problem processing your request. (create history price)");
    return $query;
}

// Read all Summary
function checkReadBySupplierId($object)
{
    $query = $object->readBySupplierId();
    checkQuery($query, "Empty records.(Read by supplier id)");
    return $query;
}

// Read Active Price Markup
function checkReadActivePriceMarkup($object)
{
    $query = $object->readActivePriceMarkup();
    checkQuery($query, "Empty records.(Read active price markup)");
    return $query;
}

// Read product history by id
function checkReadBySupplierProductHistoryId($object)
{
    $query = $object->readBySupplierProductHistoryId();
    checkQuery($query, "Empty records.(Read by supplier id with history id)");
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

// check association
function isAssociatedInHistory($object)
{
    $query = $object->checkAssociationInHistory();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete this item because it is already associated with other module.");
}

// Read search by id
function checkSearchById($object)
{
    $query = $object->searchById();
    checkQuery($query, "Empty records. (search By Id)");
    return $query;
}

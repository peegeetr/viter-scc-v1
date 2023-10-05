<?php

// Read limit
function checkReadByIdLimit($object)
{
    $query = $object->readByIdLimit();
    checkQuery($query, "Empty records. (read by id limit)");
    return $query;
}

// Read search by id
function checkSearchById($object)
{
    $query = $object->searchById();
    checkQuery($query, "Empty records. (search By Id)");
    return $query;
}
// check if have active
function haveActiveById($object)
{
    $query = $object->readAllActiveById();
    $count = $query->rowCount();
    checkExistence($count, "You can't create this new product price because you already have active status.");
}
// check if have active
function isProductHistoryExist($object)
{
    $query = $object->productHistoryExist();
    $count = $query->rowCount();
    checkExistence($count, "Already exist.");
}

// check if have active except aid
function haveActiveNotById($object)
{
    $query = $object->readAllActiveNotById();
    $count = $query->rowCount();
    checkExistence($count, "You can't edit this new product price because you already have active status.");
}

// Update supplier price
function checkUpdateSupplierPrice($object)
{
    $query = $object->updateSupplierPrice();
    checkQuery($query, "There's a problem processing your request. (update)");
    return $query;
}

// Update supplier price
function checkUpdateSupplierPriceStatus($object)
{
    $query = $object->updateSupplierPriceStatus();
    checkQuery($query, "There's a problem processing your request. (update)");
    return $query;
}

// check association
function checkAssociationInOrderPending($object)
{
    $query = $object->isAssociationInOrderPending();
    $count = $query->rowCount();
    checkExistence($count, "You cannot archive this item because it has pending order in this price.");
}

// check association
function checkAssociationInOrder($object)
{
    $query = $object->isAssociationInOrder();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete this item because it is already associated with other module.");
}

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
// search to add product 
function checksearchToAddProduct($object)
{
    $query = $object->searchToAddProduct();
    checkQuery($query, "There's a problem processing your request. (search to add product)");
    return $query;
}

// Read all
function checkReadAllMemberApproved($object)
{
    $query = $object->readAllMemberApproved();
    checkQuery($query, "Empty records.");
    return $query;
}

// Read all
function checkSearchMemberApproved($object)
{
    $query = $object->searchMemberApproved();
    checkQuery($query, "Empty records.");
    return $query;
}

// Read Active Price Markup
function checkReadActivePriceMarkup($object)
{
    $query = $object->readActivePriceMarkup();
    checkQuery($query, "Empty records.(Read active price markup)");
    return $query;
}

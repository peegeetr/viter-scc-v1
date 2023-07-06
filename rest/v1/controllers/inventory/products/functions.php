<?php

// Update 
function checkUpdateSccPrice($object)
{
    $query = $object->updateSccPrice();
    checkQuery($query, "There's a problem processing your request. (update price)");
    return $query;
}
// check Search Product 
function checkSearchProduct($object)
{
    $query = $object->searchProduct();
    checkQuery($query, "Empty records. (search produc)");
    return $query;
}

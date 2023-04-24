<?php

// Update 
function checkUpdateSccPrice($object)
{
    $query = $object->updateSccPrice();
    checkQuery($query, "There's a problem processing your request. (update price)");
    return $query;
}

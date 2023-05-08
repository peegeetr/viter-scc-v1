<?php

// Read by product id
function checkReadAllGroupByProductNumber($object)
{
    $query = $object->readAllGroupByProductNumber();
    checkQuery($query, "Empty records. (Read All group by product number)");
    return $query;
}

<?php

// Read limit
function checkReadLimitById($object)
{
    $query = $object->readLimitById();
    checkQuery($query, "Empty records. (limit by id)");
    return $query;
}

// Read qunatity
function checkUpdateQunatity($object, $sold)
{
    $query = $object->updateQunatity($sold);
    checkQuery($query, "Empty records. (Update quantity)");
    return $query;
}

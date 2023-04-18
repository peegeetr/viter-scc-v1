<?php

// Read limit
function checkReadLimitById($object)
{
    $query = $object->readLimitById();
    checkQuery($query, "Empty records. (limit by id)");
    return $query;
}

// Search by id
function checkSearchById($object)
{
    $query = $object->searchById();
    checkQuery($query, "Empty records. (Search by id)");
    return $query;
}

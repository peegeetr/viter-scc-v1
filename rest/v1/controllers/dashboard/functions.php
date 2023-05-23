<?php

// Read all
function checkReadAllActive($object)
{
    $query = $object->readAllActive();
    checkQuery($query, "Empty records. (read all active)");
    return $query;
}

// Read limit
function checkReadAllActiveLimit($object)
{
    $query = $object->readAllActiveLimit();
    checkQuery($query, "Empty records. (read all active limit)");
    return $query;
}

// Read all
function checkSearchAllActive($object)
{
    $query = $object->searchAllActive();
    checkQuery($query, "Empty records. (search all active)");
    return $query;
}

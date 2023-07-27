<?php

// Read limit
function checkReadLimitById($object)
{
    $query = $object->readLimitById();
    checkQuery($query, "Empty records. (limit by id)");
    return $query;
}

// Search by id
function checkReadMemberAllTotalPatronage($object)
{
    $query = $object->readMemberAllTotalPatronage();
    checkQuery($query, "Empty records. (Search by id)");
    return $query;
}

// Search by id
function checkFilterById($object)
{
    $query = $object->filterById();
    checkQuery($query, "Empty records. (filter by id)");
    return $query;
}

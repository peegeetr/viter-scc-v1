<?php

// Read limit
function checkReadLimitById($object)
{
    $query = $object->readLimitById();
    checkQuery($query, "Empty records. (limit by id)");
    return $query;
}

// filter by id
function checkFilterById($object)
{
    $query = $object->filterById();
    checkQuery($query, "Empty records. (Search filter by id)");
    return $query;
}

// Read Member All Total
function checkReadMemberAllTotal($object)
{
    $query = $object->readMemberAllTotal();
    checkQuery($query, "Empty records. (Read member all total by id)");
    return $query;
}

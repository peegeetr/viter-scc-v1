<?php

// Read limit
function checkReadLimitById($object)
{
    $query = $object->readLimitById();
    checkQuery($query, "Empty records. (limit by id)");
    return $query;
}

// Read limit
function checkReadTotalCapitalById($object)
{
    $query = $object->readTotalCapitalById();
    checkQuery($query, "Empty records. (read total capital by id)");
    return $query;
}

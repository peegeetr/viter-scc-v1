<?php

// Read limit
function checkReadLimit($object)
{
    $query = $object->readLimit();
    checkQuery($query, "Empty records. (limit by id)");
    return $query;
}

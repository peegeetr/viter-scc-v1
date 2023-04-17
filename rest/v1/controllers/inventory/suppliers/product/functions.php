<?php

// Read all Summary
function checkReadBySupplierId($object)
{
    $query = $object->readBySupplierId();
    checkQuery($query, "Empty records.(Read by supplier id)");
    return $query;
}

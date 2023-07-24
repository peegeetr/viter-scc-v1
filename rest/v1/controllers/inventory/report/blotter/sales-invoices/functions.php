<?php
// REPORT FILTER PETTY CASH 
function checkFilterDateRange($object)
{
    $query = $object->filterDateRange();
    checkQuery($query, "Empty records. (read filter report petty cash)");
    return $query;
}

function checkReadAllMember($object)
{
    $query = $object->readAllMember();
    checkQuery($query, "Empty records. (read all member)");
    return $query;
}

// check or
function isOrExist($object, $or)
{
    $query = $object->checkOrExist();
    $count = $query->rowCount();
    checkExistence($count, "{$or} already exist.");
}

// compare or
function compareOr($object, $or_old, $or)
{
    if (strtolower($or_old) !=  strtolower($or)) {
        isOrExist($object, $or);
    }
}

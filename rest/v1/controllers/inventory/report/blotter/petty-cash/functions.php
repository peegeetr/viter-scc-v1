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

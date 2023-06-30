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

// Update 
function checkUpdateCapitalDetails($object)
{
    $query = $object->updateCapitalDetails();
    checkQuery($query, "There's a problem processing your request. (update capital details)");
    return $query;
}

// Update 
function checkUpdateMemberFee($object)
{
    $query = $object->updateMemberFee();
    checkQuery($query, "There's a problem processing your request. (update capital details)");
    return $query;
}
// Create 
function checkCreateMemberFee($object)
{
    $query = $object->createMemberFee();
    checkQuery($query, "There's a problem processing your request. (create paid up)");
    return $query;
}

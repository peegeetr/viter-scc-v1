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

// Read search by id
function checkSearchById($object)
{
    $query = $object->searchById();
    checkQuery($query, "Empty records. (search By Id)");
    return $query;
}

// Delete Initial Pay By Id
function checkDeleteInitialPayById($object)
{
    $query = $object->deleteInitialPayById();
    checkQuery($query, "There's a problem processing your request. (delete Initial Pay By Id)");
    return $query;
}

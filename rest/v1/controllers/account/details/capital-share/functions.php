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

// Read Total Capital Penalty By Id
function checkReadTotalCapitalPenaltyById($object)
{
    $query = $object->readTotalCapitalPenaltyById();
    checkQuery($query, "Empty records. (Read Total Capital Penalty By Id)");
    return $query;
}

// Read Total Capital Penalty 
function checkReadTotalCapitalPenalty($object)
{
    $query = $object->readTotalCapitalPenalty();
    checkQuery($query, "Empty records. (Read Total Capital Penalty)");
    return $query;
}

// Read Total Capital Penalty By Id and year
function checkReadTotalCapitalPenaltyByIdAndYear($object)
{
    $query = $object->readTotalCapitalPenaltyByIdAndYear();
    checkQuery($query, "Empty records. (Read Total Capital Penalty By Id and year)");
    return $query;
}

// Read by member id and year
function checkReadByIdAndYear($object)
{
    $query = $object->readByIdAndYear();
    checkQuery($query, "Empty records. (Read by member id and year)");
    return $query;
}

// Read by member id and year
function checkReadByYear($object)
{
    $query = $object->readByYear();
    checkQuery($query, "Empty records. (Read by year)");
    return $query;
}

// Read by member id and year
function checkReadGroupByYear($object)
{
    $query = $object->readGroupByYear();
    checkQuery($query, "Empty records. (Read Group By Year)");
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

// check DATE
function isDateExist($object, $date)
{
    $query = $object->checkDateExist();
    $count = $query->rowCount();
    checkExistence($count, "{$date} already exist.");
}

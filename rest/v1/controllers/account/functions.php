<?php

// Read all
function checkReadNameById($object)
{
    $query = $object->readNameById();
    checkQuery($query, "Empty records.");
    return $query;
}

// Read all
function checkReadAllApproved($object)
{
    $query = $object->readAllApproved();
    checkQuery($query, "Empty records.");
    return $query;
}

// Read limit
function checkReadLimitApproved($object)
{
    $query = $object->readLimitApproved();
    checkQuery($query, "Empty records. (limit)");
    return $query;
}

// cancel 
function checkCancel($object)
{
    $query = $object->cancel();
    checkQuery($query, "There's a problem processing your request. (Cancel)");
    return $query;
}

// approved 
function checkApproved($object)
{
    $query = $object->approved();
    checkQuery($query, "There's a problem processing your request. (Approved)");
    return $query;
}


// Update Additional info 
function checkUpdateAdditionalInfo($object)
{
    $query = $object->updateAdditionalInfo();
    checkQuery($query, "There's a problem processing your request. (Update Additional Info)");
    return $query;
}

// Update present address info 
function checkUpdatePresentAddress($object)
{
    $query = $object->updatePresentAddress();
    checkQuery($query, "There's a problem processing your request. (Update Additional Info)");
    return $query;
}

// Update Permanent Address info 
function checkUpdatePermanentAddress($object)
{
    $query = $object->updatePermanentAddress();
    checkQuery($query, "There's a problem processing your request. (Update Additional Info)");
    return $query;
}

// Update Job Info info 
function checkUpdateJobInfo($object)
{
    $query = $object->updateJobInfo();
    checkQuery($query, "There's a problem processing your request. (Update Additional Info)");
    return $query;
}

// Update Spouse Info
function checkUpdateSpouseInfo($object)
{
    $query = $object->updateSpouseInfo();
    checkQuery($query, "There's a problem processing your request. (Update Additional Info)");
    return $query;
}


// Read search
function checkSearchApproved($object)
{
    $query = $object->searchApproved();
    checkQuery($query, "Empty records. (search approved account)");
    return $query;
}

// Read Active User Other
function checkActiveUserOther($object)
{
    $query = $object->activeUserOther();
    checkQuery($query, "Empty records. (active user other)");
    return $query;
}

// check association
function isAssociatedToPatronage($object)
{
    $query = $object->checkAssociationToPatronage();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete this item because it is already associated with other module.");
}

// check association
function isAssociatedToCapital($object)
{
    $query = $object->checkAssociationToCapital();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete this item because it is already associated with other module.");
}

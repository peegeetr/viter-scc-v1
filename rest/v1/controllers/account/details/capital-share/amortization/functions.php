<?php

// check if have active
function haveActiveById($object)
{
    $query = $object->readAllActiveById();
    $count = $query->rowCount();
    checkExistence($count, "You can't create this amortization because you already have active status.");
}

// check if have active except aid
function haveActiveNotById($object)
{
    $query = $object->readAllActiveNotById();
    $count = $query->rowCount();
    checkExistence($count, "You can't edit this amortization because you already have active status.");
}


// compare email 
function compareCurrentCapitalIsActive($object, $active_old, $active)
{
    if (strtolower($active_old) !=  strtolower($active)) {
        haveActiveNotById($object);
    }
}

// Read active
function checkReadActiveById($object)
{
    $query = $object->readAllActiveById();
    checkQuery($query, "Empty records (read active by id).");
    return $query;
}

<?php
// check if have active
function haveActive($object)
{
    $query = $object->readAllActive();
    $count = $query->rowCount();
    checkExistence($count, "You can't create this subscribe capital because you already have active status.");
}

// check if have active except aid
function haveActiveNotById($object)
{
    $query = $object->readAllActiveNotById();
    $count = $query->rowCount();
    checkExistence($count, "You can't edit this subscribe capital because you already have active status.");
}

// compare email
function compareCurrentCapitalIsActive($object, $active_old, $active)
{
    if (strtolower($active_old) !=  strtolower($active)) {
        haveActiveNotById($object);
    }
}

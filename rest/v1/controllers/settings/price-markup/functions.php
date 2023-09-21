<?php

// check name
function isActiveExist($object, $name)
{
    $query = $object->checkActive();
    $count = $query->rowCount();
    checkExistence($count, "You already have active price markup.");
}

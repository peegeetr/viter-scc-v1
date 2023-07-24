<?php

// check YEAR
function isYearExist($object, $year)
{
    $query = $object->checkYearExist();
    $count = $query->rowCount();
    checkExistence($count, "{$year} already exist.");
}

// compare year
function compareYear($object, $year_old, $year)
{
    if (strtolower($year_old) !=  strtolower($year)) {
        isYearExist($object, $year);
    }
}

<?php

function checkReadAllOrderByDate($object)
{
    $query = $object->readAllOrderByDate();
    checkQuery($query, "Empty records. (Read all order by date)");
    return $query;
}

function checkReadAllOrderByDateLimit($object)
{
    $query = $object->readAllOrderByDateLimit();
    checkQuery($query, "Empty records. (Read Limit all order by date)");
    return $query;
}


function checkReadAllOrderByProduct($object)
{
    $query = $object->readAllOrderByProduct();
    checkQuery($query, "Empty records. (Read all order by product)");
    return $query;
}

function checkReadReportOrderByMonth($object)
{
    $query = $object->readReportOrderByMonth();
    checkQuery($query, "Empty records. (Read all order by month)");
    return $query;
}

function checkReadReportOrderByDate($object)
{
    $query = $object->readReportOrderByDate();
    checkQuery($query, "Empty records. (Read all order by date)");
    return $query;
}

function checkReadReportOrderByYear($object)
{
    $query = $object->readReportOrderByYear();
    checkQuery($query, "Empty records. (Read all order by year)");
    return $query;
}

function checkReadReportOrderByAllYear($object)
{
    $query = $object->readReportOrderByAllYear();
    checkQuery($query, "Empty records. (Read all order by year)");
    return $query;
}

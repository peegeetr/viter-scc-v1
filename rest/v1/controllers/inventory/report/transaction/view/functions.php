<?php

function checkReadSalesByMonth($object)
{
    $query = $object->readSalesByMonth();
    checkQuery($query, "Empty records. (Read Sales By Month)");
    return $query;
}

function checkReadSalesByMonthAndYear($object)
{
    $query = $object->readSalesByMonthAndYear();
    checkQuery($query, "Empty records. (Read Sales By Month And Year)");
    return $query;
}

function checkReadSalesByYear($object)
{
    $query = $object->readSalesByYear();
    checkQuery($query, "Empty records. (Read Sales By Year)");
    return $query;
}

function checkReadSalesByDate($object)
{
    $query = $object->readSalesByDate();
    checkQuery($query, "Empty records. (Read Sales By Date)");
    return $query;
}

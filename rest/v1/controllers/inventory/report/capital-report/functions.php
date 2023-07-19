<?php

// REPORT FILTER SALES
// if all member, all supplier, all category, product by id 
function checkReadReportCapital($object)
{
    $query = $object->readReportCapital();
    checkQuery($query, "Empty records. (read report filter detailed capital share)");
    return $query;
}

// REPORT FILTER SALES
// if all member, all supplier, all category, product by id 
function checkReadReportCapitalByMemberId($object)
{
    $query = $object->readReportCapitalByMemberId();
    checkQuery($query, "Empty records. (read report filter detailed capital share by member id)");
    return $query;
}

// REPORT FILTER SALES
// if all member 
function checkReadReportCapitalDividend($object)
{
    $query = $object->readReportCapitalDividend();
    checkQuery($query, "Empty records. (read report filter dividend capital share)");
    return $query;
}

// REPORT FILTER SALES
// if member by id 
function checkReadReportCapitalDividendByMemberId($object)
{
    $query = $object->readReportCapitalDividendByMemberId();
    checkQuery($query, "Empty records. (read report filter dividend capital share by member id)");
    return $query;
}

// read By Member Id And Year
function checkReadByMemberIdAndYear($object)
{
    $query = $object->readByMemberIdAndYear();
    checkQuery($query, "Empty records. (read By Member Id And Year)");
    return $query;
}

// read All Total Capital By Year
function checkReadAllTotalCapitalByYear($object)
{
    $query = $object->readAllTotalCapitalByYear();
    checkQuery($query, "Empty records. (read All Total Capital By Year)");
    return $query;
}

// read All By Year
function checkReadAllByYear($object)
{
    $query = $object->readAllByYear();
    checkQuery($query, "Empty records. (read All By Year)");
    return $query;
}

// read All By Year
function checkReadAllMemberFee($object)
{
    $query = $object->readAllMemberFee();
    checkQuery($query, "Empty records. (read All Member Fee)");
    return $query;
}

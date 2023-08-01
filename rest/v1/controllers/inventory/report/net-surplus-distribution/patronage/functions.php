<?php
// REPORT FILTER PTARONAGE
// if all member by year
function checkReadReportPatronageByYear($object)
{
    $query = $object->readReportPatronageByYear();
    checkQuery($query, "Empty records. (read all member report filter patronage by year)");
    return $query;
}

// REPORT FILTER PTARONAGE
// if all member by year
function checkReadReportPatronageByYearAndMemberId($object)
{
    $query = $object->readReportPatronageByYearAndMemberId();
    checkQuery($query, "Empty records. (read all member report filter patronage by year)");
    return $query;
}

// Read all member approved
function checkReadAllApproved($object)
{
    $query = $object->readAllApproved();
    checkQuery($query, "Empty records.");
    return $query;
}

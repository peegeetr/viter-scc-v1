<?php
// REPORT FILTER PETTY CASH 
function checkFilterDateRange($object)
{
    $query = $object->filterDateRange();
    checkQuery($query, "Empty records. (read filter report petty cash)");
    return $query;
}
function checkReadAllMember($object)
{
    $query = $object->readAllMember();
    checkQuery($query, "Empty records. (read all member)");
    return $query;
}

// check voucher
function isVoucherExist($object, $voucher)
{
    $query = $object->checkVoucherExist();
    $count = $query->rowCount();
    checkExistence($count, "{$voucher} already exist.");
}

// compare voucher
function compareVoucher($object, $or_old, $voucher)
{
    if (strtolower($or_old) !=  strtolower($voucher)) {
        isVoucherExist($object, $voucher);
    }
}

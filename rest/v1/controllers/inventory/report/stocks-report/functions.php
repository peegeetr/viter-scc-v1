<?php
//read stocks report, order group by product id
function checkReadOrderGroupByProductId($object)
{
    $query = $object->readOrderGroupByProductId();
    checkQuery($query, "Empty records. (read stocks report, order group by product id)");
    return $query;
}

// REPORT FILTER STOCK
// if all supplier , category by id, all product 
function checkReadReportStocksFilterByCategory($object)
{
    $query = $object->readReportStocksFilterByCategory();
    checkQuery($query, "Empty records. (read report stocks by category)");
    return $query;
}

// REPORT FILTER STOCK
// if supplier by id, category by id , all product 
function checkReadReportStocksFilterBySupplierCategory($object)
{
    $query = $object->readReportStocksFilterBySupplierCategory();
    checkQuery($query, "Empty records. (read report stocks by supplier, category)");
    return $query;
}

// REPORT FILTER STOCK
// if supplier by id,  all category, all product 
function checkReadReportStocksFilterBySupplier($object)
{
    $query = $object->readReportStocksFilterBySupplier();
    checkQuery($query, "Empty records. (read report stocks by supplier )");
    return $query;
}

// REPORT FILTER STOCK
// if supplier by id, all category, product by id  
function checkReadReportStocksFilterBySupplierProduct($object)
{
    $query = $object->readReportStocksFilterBySupplierProduct();
    checkQuery($query, "Empty records. (read report stocks by supplier, product)");
    return $query;
}

// REPORT FILTER STOCK
// if all supplier, category by id, product by id  
function checkReadReportStocksFilterByCategoryProduct($object)
{
    $query = $object->readReportStocksFilterByCategoryProduct();
    checkQuery($query, "Empty records. (read report stocks by category, product)");
    return $query;
}

// REPORT FILTER STOCK
// if supplier by id, category by id, product by id
function checkReadReportFilterStocksBySupplierCategoryProduct($object)
{
    $query = $object->readReportFilterStocksBySupplierCategoryProduct();
    checkQuery($query, "Empty records. (read report stocks by supplier, category, product)");
    return $query;
}

// REPORT FILTER STOCK
// if all supplier, all category, product by id 
function checkReadReportStocksFilterByProduct($object)
{
    $query = $object->readReportStocksFilterByProduct();
    checkQuery($query, "Empty records. (read report stocks by product)");
    return $query;
}

// REPORT FILTER STOCK
// if all supplier, all category, product by id 
function checkReadReportStocksFilterAll($object)
{
    $query = $object->readReportStocksFilterAll();
    checkQuery($query, "Empty records. (read report stocks)");
    return $query;
}

// REPORT READ ALL STOCK QTY 
function checkReadAllStockGroupByProductNumber($object)
{
    $query = $object->readAllStockGroupByProductNumber();
    checkQuery($query, "Empty records. (read all stocks qty by date)");
    return $query;
}

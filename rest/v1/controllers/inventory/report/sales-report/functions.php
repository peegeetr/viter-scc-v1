<?php
// REPORT FILTER SALES
// if all supplier , category by id, all product 
function checkReadReportSalesFilterByCategory($object)
{
    $query = $object->readReportSalesFilterByCategory();
    checkQuery($query, "Empty records. (read report sales by category)");
    return $query;
}

// REPORT FILTER SALES
// if supplier by id, by id category, all product
function checkReadReportSalesFilterBySupplierCategory($object)
{
    $query = $object->readReportSalesFilterBySupplierCategory();
    checkQuery($query, "Empty records. (read report sales by supplier and category)");
    return $query;
}

// REPORT FILTER SALES
// if supplier by id, all category, all product 
function checkReadReportSalesFilterBySupplier($object)
{
    $query = $object->readReportSalesFilterBySupplier();
    checkQuery($query, "Empty records. (read report sales by supplier)");
    return $query;
}

// REPORT FILTER SALES
// if supplier by id, all category, product by id  
function checkReadReportSalesFilterBySupplierProduct($object)
{
    $query = $object->readReportSalesFilterBySupplierProduct();
    checkQuery($query, "Empty records. (read report sales by supplier and product)");
    return $query;
}

// REPORT FILTER SALES
// if  all supplier, category by id, product by id  
function checkReadReportSalesFilterByCategoryProduct($object)
{
    $query = $object->readReportSalesFilterByCategoryProduct();
    checkQuery($query, "Empty records. (read report sales by category and product)");
    return $query;
}

// REPORT FILTER SALES
// if supplier by id, category by id, product by id
function checkReadReportFilterSalesBySupplierCategoryProduct($object)
{
    $query = $object->readReportFilterSalesBySupplierCategoryProduct();
    checkQuery($query, "Empty records. (read report filter sales by supplier, category, product)");
    return $query;
}

// REPORT FILTER SALES
// if all supplier, all category, product by id 
function checkReadReportSalesFilterByProduct($object)
{
    $query = $object->readReportSalesFilterByProduct();
    checkQuery($query, "Empty records. (read report filter sales by product)");
    return $query;
}

// REPORT FILTER SALES
// if all supplier, all category, all product 
function checkReadReportSalesFilterAll($object)
{
    $query = $object->readReportSalesFilterAll();
    checkQuery($query, "Empty records. (read report filter sales all)");
    return $query;
}
//  DropDown data
// Read category by supplier id
function checkReadCategoryBySupplierId($object)
{
    $query = $object->readCategoryBySupplierId();
    checkQuery($query, "Empty records.(Read by supplier id)");
    return $query;
}

//  DropDown data
// Read category by category id
function checkReadSupplierCategoryByCategoryId($object)
{
    $query = $object->readSupplierCategoryByCategoryId();
    checkQuery($query, "Empty records.(Read by category id)");
    return $query;
}

//  DropDown data
// Read product by supplier id and category
function checkReadSupplierCategoryBySupplierId($object)
{
    $query = $object->readSupplierCategoryBySupplierId();
    checkQuery($query, "Empty records.(Read by supplier id)");
    return $query;
}

<?php
// REPORT FILTER SALES
// if all member, all supplier , category by id, all product 
function checkReadReportSalesFilterByCategory($object)
{
    $query = $object->readReportSalesFilterByCategory();
    checkQuery($query, "Empty records. (read report sales by category)");
    return $query;
}

// REPORT FILTER SALES
// if all member, supplier by id, by id category, all product
function checkReadReportSalesFilterBySupplierCategory($object)
{
    $query = $object->readReportSalesFilterBySupplierCategory();
    checkQuery($query, "Empty records. (read report sales by supplier and category)");
    return $query;
}

// REPORT FILTER SALES
// if all member, supplier by id, all category, all product 
function checkReadReportSalesFilterBySupplier($object)
{
    $query = $object->readReportSalesFilterBySupplier();
    checkQuery($query, "Empty records. (read report sales by supplier)");
    return $query;
}

// REPORT FILTER SALES
// if all member, supplier by id, all category, product by id  
function checkReadReportSalesFilterBySupplierProduct($object)
{
    $query = $object->readReportSalesFilterBySupplierProduct();
    checkQuery($query, "Empty records. (read report sales by supplier and product)");
    return $query;
}

// REPORT FILTER SALES
// if  all member, all supplier, category by id, product by id  
function checkReadReportSalesFilterByCategoryProduct($object)
{
    $query = $object->readReportSalesFilterByCategoryProduct();
    checkQuery($query, "Empty records. (read report sales by category and product)");
    return $query;
}

// REPORT FILTER SALES
// if all member, supplier by id, category by id, product by id
function checkReadReportFilterSalesBySupplierCategoryProduct($object)
{
    $query = $object->readReportFilterSalesBySupplierCategoryProduct();
    checkQuery($query, "Empty records. (read report filter sales by supplier, category, product)");
    return $query;
}

// REPORT FILTER SALES
// if all member, all supplier, all category, product by id 
function checkReadReportSalesFilterByProduct($object)
{
    $query = $object->readReportSalesFilterByProduct();
    checkQuery($query, "Empty records. (read report filter sales by product)");
    return $query;
}

// REPORT FILTER SALES
// if member by id, all supplier, all category, all product 
function checkReadReportSalesFilterByMember($object)
{
    $query = $object->readReportSalesFilterByMember();
    checkQuery($query, "Empty records. (read report filter sales by member)");
    return $query;
}

// REPORT FILTER SALES
// if member by id, supplier by id, all category, all product
function checkReadReportSalesFilterByMemberSupplier($object)
{
    $query = $object->readReportSalesFilterByMemberSupplier();
    checkQuery($query, "Empty records. (read report filter sales by member, supplier)");
    return $query;
}

// REPORT FILTER SALES
// if member by id, supplier by id, category by id, all product
function checkReadReportSalesFilterByMemberSupplierCategory($object)
{
    $query = $object->readReportSalesFilterByMemberSupplierCategory();
    checkQuery($query, "Empty records. (read report filter sales by member, supplier, category)");
    return $query;
}

// REPORT FILTER SALES
// if member by Id, supplier by Id, category by Id, product by Id
function checkReadReportSalesFilterByMemberSupplierCategoryProduct($object)
{
    $query = $object->readReportSalesFilterByMemberSupplierCategoryProduct();
    checkQuery($query, "Empty records. (read report filter sales by member, supplier, category, product)");
    return $query;
}

// REPORT FILTER SALES
// if member by Id, supplier by Id, all category , product by Id
function checkReadReportSalesFilterByMemberSupplierProduct($object)
{
    $query = $object->readReportSalesFilterByMemberSupplierProduct();
    checkQuery($query, "Empty records. (read report filter sales by member, supplier, product)");
    return $query;
}

// REPORT FILTER SALES
// if member by Id, all supplier, category by Id , product by Id
function checkReadReportSalesFilterByMemberCategoryProduct($object)
{
    $query = $object->readReportSalesFilterByMemberCategoryProduct();
    checkQuery($query, "Empty records. (read report filter sales by member, category, product)");
    return $query;
}

// REPORT FILTER SALES
// if member by Id, all supplier, all category , product by Id
function checkReadReportSalesFilterByMemberProduct($object)
{
    $query = $object->readReportSalesFilterByMemberProduct();
    checkQuery($query, "Empty records. (read report filter sales by member, product)");
    return $query;
}

// REPORT FILTER SALES
// if member by Id, all supplier, category by Id , all product
function checkReadReportSalesFilterByMemberCategory($object)
{
    $query = $object->readReportSalesFilterByMemberCategory();
    checkQuery($query, "Empty records. (read report filter sales by member, category)");
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

// Read all member approved
function checkReadAllApproved($object)
{
    $query = $object->readAllApproved();
    checkQuery($query, "Empty records.");
    return $query;
}

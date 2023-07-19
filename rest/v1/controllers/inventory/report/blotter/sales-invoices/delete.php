<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$salesInvoices = new SalesInvoices($conn);
// get $_GET data
// check if fileid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("salesInvoicesId", $_GET)) {

    // get task id from query string
    $salesInvoices->or_invoice_aid = $_GET['salesInvoicesId'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($salesInvoices->or_invoice_aid);
    // delete
    $query = checkDelete($salesInvoices);

    returnSuccess($salesInvoices, "sales invoices", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

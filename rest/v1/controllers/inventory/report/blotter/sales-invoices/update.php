<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$salesInvoices = new SalesInvoices($conn);
// get $_GET data
// check if fileid is in the url e.g. /fileid/1
$error = [];
$returnData = [];
if (array_key_exists("salesInvoicesId", $_GET)) {
    // check data
    checkPayload($data);
    // get salesInvoicesId from query string
    $salesInvoices->or_invoice_aid = $_GET['salesInvoicesId'];
    $salesInvoices->or_invoice_date = checkIndex($data, "or_invoice_date");
    $salesInvoices->or_invoice_or_no = checkIndex($data, "or_invoice_or_no");
    $salesInvoices->or_invoice_payee_id = checkIndex($data, "or_invoice_payee_id");
    $salesInvoices->or_invoice_amount = checkIndex($data, "or_invoice_amount");
    $salesInvoices->or_invoice_remarks = checkIndex($data, "or_invoice_remarks");
    $salesInvoices->or_invoice_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($salesInvoices->or_invoice_aid);
    compareOr($salesInvoices, $data["or_invoice_or_no_old"], $salesInvoices->or_invoice_or_no);
    // update
    $query = checkUpdate($salesInvoices);
    returnSuccess($salesInvoices, "sales invoices", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

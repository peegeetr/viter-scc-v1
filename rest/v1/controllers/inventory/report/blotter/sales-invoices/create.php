<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$salesInvoices = new SalesInvoices($conn);
// get should not be present
if (array_key_exists("salesInvoicesId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$salesInvoices->or_invoice_date = checkIndex($data, "or_invoice_date");
$salesInvoices->or_invoice_or_no = checkIndex($data, "or_invoice_or_no");
$salesInvoices->or_invoice_payee_id = checkIndex($data, "or_invoice_payee_id");
$salesInvoices->or_invoice_amount = checkIndex($data, "or_invoice_amount");
$salesInvoices->or_invoice_remarks = checkIndex($data, "or_invoice_remarks");
$salesInvoices->or_invoice_is_official_receipt = 0;
$salesInvoices->or_invoice_is_sales_invoice = 1;
$salesInvoices->or_invoice_created = date("Y-m-d H:i:s");
$salesInvoices->or_invoice_datetime = date("Y-m-d H:i:s");

// create
$query = checkCreate($salesInvoices);

returnSuccess($salesInvoices, "sales invoices", $query);

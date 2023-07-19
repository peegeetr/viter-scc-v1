<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$official_receipt = new OfficialReceipt($conn);
// get should not be present
if (array_key_exists("officaialReceiptId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$official_receipt->or_invoice_date = checkIndex($data, "or_invoice_date");
$official_receipt->or_invoice_or_no = checkIndex($data, "or_invoice_or_no");
$official_receipt->or_invoice_payee_id = checkIndex($data, "or_invoice_payee_id");
$official_receipt->or_invoice_amount = checkIndex($data, "or_invoice_amount");
$official_receipt->or_invoice_remarks = checkIndex($data, "or_invoice_remarks");
$official_receipt->or_invoice_is_official_receipt = 1;
$official_receipt->or_invoice_is_sales_invoice = 0;
$official_receipt->or_invoice_created = date("Y-m-d H:i:s");
$official_receipt->or_invoice_datetime = date("Y-m-d H:i:s");

// create
$query = checkCreate($official_receipt);

returnSuccess($official_receipt, "official receipt", $query);

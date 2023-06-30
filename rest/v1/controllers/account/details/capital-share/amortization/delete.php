<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$amortization = new Amortization($conn);
// get $_GET data
// check if shareid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("amortizationId", $_GET)) {

    // get task id from query string
    $amortization->capital_amortization_aid = $_GET['amortizationId'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($amortization->capital_amortization_aid);

    // delete
    $query = checkDelete($amortization);

    returnSuccess($amortization, "Amortization", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

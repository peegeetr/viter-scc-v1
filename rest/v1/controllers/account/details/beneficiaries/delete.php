<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$beneficiaries = new Beneficiaries($conn);
// get $_GET data
// check if beneficiariesid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("beneficiariesid", $_GET)) {

    // get task id from query string
    $beneficiaries->beneficiaries_aid = $_GET['beneficiariesid'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($beneficiaries->beneficiaries_aid);

    // delete
    $query = checkDelete($beneficiaries);

    returnSuccess($beneficiaries, "beneficiaries", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

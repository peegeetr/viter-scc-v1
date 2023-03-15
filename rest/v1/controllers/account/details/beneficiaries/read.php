<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$beneficiaries = new Beneficiaries($conn);
// get $_GET data
// check if beneficiariesid is in the url e.g. /beneficiaries/1
$error = [];
$returnData = [];
if (array_key_exists("beneficiariesid", $_GET)) {
    // get task id from query string
    $beneficiaries->beneficiaries_employee_id = $_GET['beneficiariesid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($beneficiaries->beneficiaries_employee_id);
    $query = checkReadById($beneficiaries);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /beneficiaries
if (empty($_GET)) {
    $query = checkReadAll($beneficiaries);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();

<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$beneficiaries = new beneficiaries($conn);
// get should not be present
if (array_key_exists("beneficiariesid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$beneficiaries->beneficiaries_employee_id = checkIndex($data, "beneficiaries_employee_id");
$beneficiaries->beneficiaries_name = checkIndex($data, "beneficiaries_name");
$beneficiaries->beneficiaries_relationship = checkIndex($data, "beneficiaries_relationship");
$beneficiaries->beneficiaries_created = date("Y-m-d H:i:s");
$beneficiaries->beneficiaries_datetime = date("Y-m-d H:i:s"); 

// check name
    isNameExist($beneficiaries, $beneficiaries->beneficiaries_name);
    // create
    $query = checkCreate($beneficiaries);   
returnSuccess($beneficiaries, "beneficiaries", $query);

<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$beneficiaries = new Beneficiaries($conn);
// get $_GET data
// check if beneficiariesid is in the url e.g. /beneficiariesid/1
$error = [];
$returnData = [];
if (array_key_exists("beneficiariesid", $_GET)) { 
    // check data
    checkPayload($data);
    // get data 
        $beneficiaries->beneficiaries_aid = $_GET['beneficiariesid']; 
        $beneficiaries->beneficiaries_name = checkIndex($data, "beneficiaries_name");
        $beneficiaries->beneficiaries_relationship = checkIndex($data, "beneficiaries_relationship"); 
        $beneficiaries->beneficiaries_datetime = date("Y-m-d H:i:s"); 

        $beneficiaries_name_old = strtolower($data["beneficiaries_last_name_old"]);  
     
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($beneficiaries->beneficiaries_aid);
        // check name
        compareName($beneficiaries, $beneficiaries_name_old, $beneficiaries->beneficiaries_name); 
        // update
        $query = checkUpdate($beneficiaries); 
        returnSuccess($beneficiaries, "beneficiaries", $query); 
     
}

// return 404 error if endpoint not available
checkEndpoint();

<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$members = new Members($conn);
// get $_GET data
// check if membersid is in the url e.g. /membersid/1
$error = [];
$returnData = [];
if (array_key_exists("membersid", $_GET) && array_key_exists("isUpdate", $_GET)) {
    checkPayload($data);

    $members->members_aid = $_GET['membersid'];
    $isUpdate = $_GET['isUpdate'];

    // if additional info update
    if ($isUpdate === "additional") {
        $members->members_civil_status = checkIndex($data, "members_civil_status");
        $members->members_birth_place = checkIndex($data, "members_birth_place");
        $members->members_email = checkIndex($data, "members_email");
        $members->members_contact_no = checkIndex($data, "members_contact_no");
        $members->members_education_attainment = checkIndex($data, "members_education_attainment");
        $members->members_datetime = date("Y-m-d H:i:s");

        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($members->members_aid);
        // update
        $query = checkUpdateAdditionalInfo($members);
        returnSuccess($members, "members", $query);
    }

    // if present address info update
    if ($isUpdate === "present") {

        $members->members_present_address = checkIndex($data, "members_present_address");
        $members->members_present_zip_code = checkIndex($data, "members_present_zip_code");
        $members->members_present_mobile_no = checkIndex($data, "members_present_mobile_no");
        $members->members_datetime = date("Y-m-d H:i:s");

        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($members->members_aid);
        // update
        $query = checkUpdatePresentAddress($members);
        returnSuccess($members, "members", $query);
    }

    // if permanent address info update
    if ($isUpdate === "permanent") {

        $members->members_permanent_address = checkIndex($data, "members_permanent_address");
        $members->members_permanent_zip_code = checkIndex($data, "members_permanent_zip_code");
        $members->members_permanent_mobile_no = checkIndex($data, "members_permanent_mobile_no");
        $members->members_datetime = date("Y-m-d H:i:s");

        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($members->members_aid);
        // update
        $query = checkUpdatePermanentAddress($members);
        returnSuccess($members, "members", $query);
    }

    // if job info update
    if ($isUpdate === "jobinfo") {

        $members->members_position = checkIndex($data, "members_position");
        $members->members_income_gross = checkIndex($data, "members_income_gross");
        $members->members_income_net = checkIndex($data, "members_income_net");
        $members->members_other_source_income = checkIndex($data, "members_other_source_income");
        $members->members_other_income = checkIndex($data, "members_other_income");
        $members->members_datetime = date("Y-m-d H:i:s");

        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($members->members_aid);
        // update
        $query = checkUpdateJobInfo($members);
        returnSuccess($members, "members", $query);
    }

    // if spouse info update
    if ($isUpdate === "spouse") {

        $members->members_spouse_occupation = checkIndex($data, "members_spouse_occupation");
        $members->members_spouse_income = checkIndex($data, "members_spouse_income");
        $members->members_spouse_net_income = checkIndex($data, "members_spouse_net_income");
        $members->members_properties_owned = checkIndex($data, "members_properties_owned");
        $members->members_datetime = date("Y-m-d H:i:s");

        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($members->members_aid);
        // update
        $query = checkUpdateSpouseInfo($members);
        returnSuccess($members, "members", $query);
    }
}
if (array_key_exists("membersid", $_GET)) {
    // check data
    checkPayload($data);
    // get data 
    $members->members_aid = $_GET['membersid'];

    $members->members_id = checkIndex($data, "members_id");
    $members->members_pre_membership_date = checkIndex($data, "members_pre_membership_date");
    $members->members_first_name = checkIndex($data, "members_first_name");
    $members->members_last_name = checkIndex($data, "members_last_name");
    $members->members_middle_name = checkIndex($data, "members_middle_name");
    $members->members_gender = checkIndex($data, "members_gender");
    $members->members_birth_date = checkIndex($data, "members_birth_date");
    $members->members_datetime = date("Y-m-d H:i:s");
    $members->members_picture = $data["members_picture"];

    $members_lname_old = strtolower($data["members_last_name_old"]);
    $members_fname_old = strtolower($data["members_first_name_old"]);
    $members_mname_old = strtolower($data["members_middle_name_old"]);


    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($members->members_aid);
    // check name
    compareName($members, $members_lname_old, $members->members_last_name);
    compareName($members, $members_fname_old, $members->members_first_name);
    compareName($members, $members_mname_old, $members->members_middle_name);
    // update
    $query = checkUpdate($members);
    returnSuccess($members, "members", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

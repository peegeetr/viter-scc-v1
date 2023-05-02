<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$members = new Members($conn);
// get should not be present
if (array_key_exists("membersid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$members->members_pre_membership_date = checkIndex($data, "members_pre_membership_date");
$members->members_first_name = checkIndex($data, "members_first_name");
$members->members_last_name = checkIndex($data, "members_last_name");
$members->members_middle_name = checkIndex($data, "members_middle_name");
$members->members_gender = checkIndex($data, "members_gender");
$members->members_birth_date = checkIndex($data, "members_birth_date");
$members->members_is_active = 1;
$members->members_created = date("Y-m-d H:i:s");
$members->members_datetime = date("Y-m-d H:i:s");

// create member id format ex. (yy-mm-001)
$rawNewMemberId  = explode("-", $data["members_pre_membership_date"]);
$formattedMemberId = "";
$id = "";
$memberLastId = $members->readLastMemberId();
if ($memberLastId->rowCount() == 0) {
    // create new id
    $formattedMemberId = substr($rawNewMemberId[0], 2) . "-" . $rawNewMemberId[1] . "-" . "001";
} else {

    $row = $memberLastId->fetch(PDO::FETCH_ASSOC);
    extract($row);
    // member_id from existing record ex. (22-01-001)
    $existingMeberId = explode("-", $members_id);

    $lastId =  intval($existingMeberId[2]) + 1;
    if ($lastId < 10) {
        $id = "00" . $lastId;
    } elseif ($lastId < 100) {
        $id = "0" . $lastId;
    } else {
        $id = $lastId;
    }

    $formattedMemberId = $existingMeberId[0] . "-" . $existingMeberId[1] . "-" . $id;
}



//check to see if search keyword in query string is not empty and less than 50 chars
checkKeyword($formattedMemberId);


$members->members_id = $formattedMemberId;

$name = "$members->members_last_name, $members->members_first_name";

// check name
isNameExist($members, $name);
// create
$query = checkCreate($members);
returnSuccess($members, "members", $query);

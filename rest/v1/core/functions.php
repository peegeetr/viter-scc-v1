<?php

use \Firebase\JWT\JWT;

require "Database.php";
require "Response.php";

function checkApiKey()
{
    // validate apikey
    http_response_code(200);
    $apiKey = require __DIR__ . '/../../../apikey.php';
    // $apiKey = require $_SERVER["DOCUMENT_ROOT"] . '/../apikey.php';
    $auth_array = explode(" ", $_SERVER['HTTP_AUTHORIZATION']);
    $un_pw = explode(":", base64_decode($auth_array[1]));
    $un = $un_pw[0];

    if ($un !== $apiKey["sccToken"]) {
        $response = new Response();
        $error = [];
        $response->setSuccess(false);
        $error['type'] = "invalid_request_error";
        $error['error'] = "Invalid API key.";
        $error["success"] = false;
        $error["data"] = [];
        $error["count"] = 0;
        $response->setData($error);
        $response->send();
        exit;
    }
}

function checkDbConnection()
{
    try {
        $conn = Database::connectDb();
        return $conn;
    } catch (PDOException $ex) {
        $response = new Response();
        $error = [];
        $response->setSuccess(false);
        $error['type'] = "invalid_request_error";
        $error["success"] = false;
        $error['error'] = "Database connection failed.";
        $response->setData($error);
        $response->send();
        exit;
    }
}

function checkQuery($query, $msg)
{
    if (!$query) {
        $response = new Response();
        $error = [];
        $response->setSuccess(false);
        $error["count"] = 0;
        $error["success"] = false;
        $error['type'] = "invalid_request_error";
        $error['error'] = $msg;
        $response->setData($error);
        $response->send();
        exit;
    }
}

function invalidInput()
{
    $response = new Response();
    $error = [];
    $response->setSuccess(false);
    $error["count"] = 0;
    $error["success"] = false;
    $error['error'] = "Invalid input.";
    $response->setData($error);
    $response->send();
    exit;
}

// check payload
function checkPayload($jsonData)
{
    if (
        empty($jsonData) || $jsonData === null
    ) {
        invalidInput();
    }
}

// check payload index
function checkIndex($jsonData, $index)
{
    if (
        !isset($jsonData[$index]) || $jsonData[$index] === ""
    ) {
        invalidInput();
    }
    return addslashes(trim($jsonData[$index]));
}

// check id
function checkId($id)
{
    $response = new Response();
    if ($id == '' || !is_numeric($id)) {
        $response->setSuccess(false);
        $error = [];
        $error['code'] = "400";
        $error['error'] = "ID cannot be blank or must be numeric.";
        $error["success"] = false;
        $response->setData($error);
        $response->send();
        exit;
    }
}

// check search param
function checkKeyword($keyword)
{
    $response = new Response();
    if ($keyword == '') {
        $response->setSuccess(false);
        $error = [];
        $error['code'] = "400";
        $error['error'] = "Search keyword cannot be blank.";
        $error["success"] = false;
        $error["keyword"] = $keyword;
        $response->setData($error);
        $response->send();
        exit;
    }
}

// check limit id
function checkLimitId($start, $total)
{
    $response = new Response();
    if ($start == '' || !is_numeric($start) || $total == '' || !is_numeric($total)) {
        $response->setSuccess(false);
        $error = [];
        $error['code'] = "400";
        $error['error'] = "Limit ID cannot be blank or must be numeric.";
        $error["success"] = false;
        $response->setData($error);
        $response->send();
        exit;
    }
}

// create sucess
function returnSuccess($object, $name, $query, $newCount = 0)
{
    $response = new Response();
    $returnData = [];
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["{$name} ID"] = $object->lastInsertedId;
    $returnData["success"] = true;
    $returnData["added"] = $newCount;
    // return $returnData;
    $response->setData($returnData);
    $response->send();
    exit;
}

// Create 
function checkCreate($object)
{
    $query = $object->create();
    checkQuery($query, "There's a problem processing your request. (create)");
    return $query;
}

// Login
function checkLogin($object)
{
    $response = new Response();
    $query = $object->readLogin();
    if ($query->rowCount() == 0) {
        $response->setSuccess(false);
        $error["count"] = 0;
        $error["success"] = false;
        $error['error'] = "Invalid account. Please use a registered one.";
        $response->setData($error);
        $response->send();
        exit;
    }
    return $query;
}

// Set password
function checkSetPassword($object)
{
    $query = $object->setPassword();
    checkQuery($query, "There's a problem processing your request. (set password)");
    return $query;
}


// Login access
function loginAccess(
    $password,
    $hash_password,
    $employee_email,
    $row,
    $result,
    $key,
    $isDev = false
) {
    $response = new Response();
    $error = [];
    $returnData = [];
    if (password_verify($password, $hash_password)) {
        $payload = array(
            "iss" => "localhost", // A string containing the name or identifier of the issuer application.
            "aud" => "scc",
            "iat" => time(),  // timestamp of token issuing.
            "data" => array("email" => $employee_email, "data" => $row, "isDev" => $isDev), // App payload
        );
        $jwt = JWT::encode($payload, $key, 'HS256');

        http_response_code(200);
        $returnData["data"] = [$row, $jwt, $isDev];
        $returnData["count"] = $result->rowCount();
        $returnData["success"] = true;
        $returnData["message"] = "Access granted.";
        $response->setData($returnData);
        $response->send();
        return $returnData;
    } else {
        $response->setSuccess(false);
        $error["count"] = 0;
        $error["success"] = false;
        $error['error'] = "Access denied.";
        $response->setData($error);
        $response->send();
        exit;
    }
    checkEndpoint();
    http_response_code(200);
    checkAccess();
}

// Token
function token(
    $object,
    $token,
    $key
) {
    $response = new Response();
    $error = [];
    $returnData = [];

    if (!empty($token)) {
        try {
            $decoded = JWT::decode($token, $key, array('HS256'));
            ($object->user_system_email = $decoded->data->email
                | $object->members_email = $decoded->data->email);
            $result = checkLogin($object);
            $row = $result->fetch(PDO::FETCH_ASSOC);

            http_response_code(200);
            $returnData["data"] = $row;
            $returnData["count"] = $result->rowCount();
            $returnData["isDev"] = $decoded->data->isDev;
            $returnData["success"] = true;
            $returnData["message"] = "Access granted.";
            $response->setData($returnData);
            $response->send();
            return $returnData;
        } catch (Exception $ex) {
            $response->setSuccess(false);
            $error["count"] = 0;
            $error["success"] = false;
            $error['error'] = "Catch no token found.";
            $response->setData($error);
            $response->send();
            exit;
        }
    } else {
        $response->setSuccess(false);
        $error["count"] = 0;
        $error["success"] = false;
        $error['error'] = "No token found.";
        $response->setData($error);
        $response->send();
        exit;
    }
    checkEndpoint();
    http_response_code(200);
    checkAccess();
}

// Read all
function checkReadAll($object)
{
    $query = $object->readAll();
    checkQuery($query, "Empty records.");
    return $query;
}

// Read limit
function checkReadLimit($object)
{
    $query = $object->readLimit();
    checkQuery($query, "Empty records. (limit)");
    return $query;
}

// Read search
function checkSearch($object)
{
    $query = $object->search();
    checkQuery($query, "Empty records. (search)");
    return $query;
}

// Read by id
function checkReadById($object)
{
    $query = $object->readById();
    checkQuery($query, "Empty records. (by id)");
    return $query;
}

// Read by id
function checkReadKey($object)
{
    $query = $object->readKey();
    checkQuery($query, "Empty records. (key)");
    return $query;
}
// Update 
function checkUpdate($object)
{
    $query = $object->update();
    checkQuery($query, "There's a problem processing your request. (update)");
    return $query;
}

// Active 
function checkActive($object)
{
    $query = $object->active();
    checkQuery($query, "There's a problem processing your request. (active)");
    return $query;
}

// Reset 
function checkReset($object)
{
    $query = $object->reset();
    checkQuery($query, "There's a problem processing your request. (reset)");
    return $query;
}

// Delete 
function checkDelete($object)
{
    $query = $object->delete();
    checkQuery($query, "There's a problem processing your request. (delete)");
    return $query;
}

// Create column data
function checkAddColumn($object, $column_name)
{
    $query = $object->addColumn($column_name);
    checkQuery($query, "There's a problem processing your request. (create column)");
    return $query;
}

// Update column value
function checkUpdateColumnValue($object, $column_name)
{
    $query = $object->updateColumnValue($column_name);
    checkQuery($query, "There's a problem processing your request. (update column value)");
    return $query;
}

// Update column name
function checkUpdateColumnName($object, $column_name, $column_name_old)
{
    $query = $object->updateColumnName($column_name, $column_name_old);
    checkQuery($query, "There's a problem processing your request. (update column name)");
    return $query;
}

// Drop column name
function checkDropColumnName($object, $column_name)
{
    $query = $object->dropColumnName($column_name);
    checkQuery($query, "There's a problem processing your request. (drop column name)");
    return $query;
}

// Result data
function getResultData($query)
{
    $data = $query->fetchAll();
    return $data;
}

// send response
function sendResponse($result)
{
    $response = new Response();
    $response->setSuccess(true);
    $response->setStatusCode(200);
    $response->setData($result);
    $response->send();
}

// forbidden access
function checkAccess()
{
    $response = new Response();
    $error = [];
    $response->setSuccess(false);
    $error['code'] = "401";
    $error['error'] = "Forbidden access.";
    $response->setData($error);
    $response->send();
    exit;
}

// check endpoint
function checkEndpoint()
{
    $response = new Response();
    $error = [];
    $response->setSuccess(false);
    $error['code'] = "404";
    $error['error'] = "Endpoint not found.";
    $error["success"] = false;
    $response->setData($error);
    $response->send();
    exit;
}

// validator

// if error
function resultError($msg)
{
    $response = new Response();
    $error = [];
    $response->setSuccess(false);
    $error['error'] = $msg;
    $error["success"] = false;
    $response->setData($error);
    $response->send();
    exit;
}
// check existence
function checkExistence($count, $msg = "")
{
    if ($count > 0) {
        $response = new Response();
        $error = [];
        $response->setSuccess(false);
        $error['error'] = $msg;
        $error["success"] = false;
        $response->setData($error);
        $response->send();
        exit;
    }
}

// check association
function isAssociated($object)
{
    $query = $object->checkAssociation();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete this item because it is already associated with other module.");
}

// check name
function isNameExist($object, $name)
{
    $query = $object->checkName();
    $count = $query->rowCount();
    checkExistence($count, "{$name} already exist.");
}


// check email
function isEmailExist($object, $email)
{
    $query = $object->checkEmail();
    $count = $query->rowCount();
    checkExistence($count, "{$email} already exist.");
}

// compare name
function compareName($object, $name_old, $name)
{
    if (strtolower($name_old) !=  strtolower($name)) {
        isNameExist($object, $name);
    }
}

// compare email
function compareEmail($object, $email_old, $email)
{
    if (strtolower($email_old) !=  strtolower($email)) {
        isEmailExist($object, $email);
    }
}

function compareTwoValues($object, $name_old, $name, $id_old, $id)
{
    if (strtolower($name_old) !=  strtolower($name) || $id_old !=  $id) {
        isNameExist($object, $name);
    }
}

// return success
function getQueriedData($query)
{
    $response = new Response();
    $returnData = [];
    $returnData["data"] = getResultData($query);
    $returnData["count"] = $query->rowCount();
    $returnData["success"] = true;
    $response->setData($returnData);
    $response->send();
    exit;
}

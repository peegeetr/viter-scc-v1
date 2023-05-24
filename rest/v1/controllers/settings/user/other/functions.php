<?php


// check member email
function isMemberAccountExist($object, $email)
{
    $query = $object->readMemberAccountExist();
    $count = $query->rowCount();
    checkExistence($count, "{$email} already have an account.");
}

// Login
function checkMemberEmail($object)
{
    $response = new Response();
    $query = $object->readMemberEmail();
    if ($query->rowCount() == 0) {
        $response->setSuccess(false);
        $error["count"] = 0;
        $error["success"] = false;
        $error['error'] = "Invalid member email. Please use a registered one.";
        $response->setData($error);
        $response->send();
        exit;
    }
    return $query;
}

<?php

if (function_exists('get_magic_quotes_gpc') && get_magic_quotes_gpc()) {
    function stripslashes_deep($value)
    {
        if (is_array($value)) {
            $value = array_map('stripslashes_deep', $value);
        } elseif (!empty($value) && is_string($value)) {
            $value = stripslashes($value);
        }
        return $value;
    }

    $_POST = stripslashes_deep($_POST);
    $_GET = stripslashes_deep($_GET);
    $_COOKIE = stripslashes_deep($_COOKIE);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!empty($_POST['action'])) {
        $action = $_POST['action'];

        if ($action == 'report_bad_support') {
            if (!empty($_POST['xpath']) && !empty($_POST['url'])) {

                $msg = "URL: {$_POST['url']}" .
                    "\nXPath: {$_POST['xpath']}";

                $emailMsg = "Sent from CodeHighlight.com:\n\n" . $msg . '\n';

                $from = 'postmaster@codehighlight.com';
                $to = 'feedback@codehighlight.com';
                mail($to, "Bad Support Message", $emailMsg, "From: {$from}");
            }
        }
    }
}
?>

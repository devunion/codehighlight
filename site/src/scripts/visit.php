<?php
$_OUT_MAP = Array(
    'blaszok_theme_details' => 'https://themeforest.net/item/blaszok-ecommerce-theme/7163563?ref=devunion'
);

$key = $_GET['to'];
if (isset($_GET['lang'])) {
    $key .= '_'.$_GET['lang'];

    if (isset($_OUT_MAP[$key])) {
        $url = $_OUT_MAP[$key];
    } else {
        $url = $_OUT_MAP[$_GET['to']];
    }
} else {
    $url = $_OUT_MAP[$_GET['to']];
}

if ($url != null) {
    header('Location: '. $url);
} else {
    header('Location: /');
}
?>
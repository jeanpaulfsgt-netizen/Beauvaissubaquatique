<?php
header('Content-Type: application/json');

$dossiers = ['dossier1','dossier2','dossier3'];
$result = [];

foreach($dossiers as $dossier){
    $files = array_values(array_filter(scandir("images/$dossier"), function($f){
        return preg_match('/\.(jpg|jpeg|png|gif)$/i',$f);
    }));
    $result[$dossier] = $files;
}

echo json_encode($result);
?>

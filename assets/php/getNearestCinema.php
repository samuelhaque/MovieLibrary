<?php
// this returns an array of the closest cinema id's

$ub = $_REQUEST['nub'];

$api = 'cinemasNearby/?n='.$ub;

include 'login.php';

function getCinemas($arrayToSearch){
	$array = array(); 
    foreach($arrayToSearch['cinemas'] as $key => $value) {
        array_push($array,$value['cinema_id']); 
    }
    return $array; 
}

if($body != null){
	$arrayToSearch = json_decode($body, true);
	$dsa = getCinemas($arrayToSearch);
	echo json_encode($dsa); 
}else{
  echo 'EMPTY';
}


$headers = explode("\r\n", $headers);
$headers = array_filter($headers);

//Output Headers

$allHeaders = '';
foreach ($headers as $value) {
    $allHeaders .= '<li>' . $value . '</li>';
}
$allHeaders = '<ul>' . $allHeaders . '</ul>';

echo $allHeaders;

$response = json_decode($body, true);

  if($http_code == 200){
      echo "<pre>" . json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "</pre>";
  }elseif($http_code == 204){
      echo 'No results for request';
      echo "<pre>" . json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "</pre>";
  }else{
      exit();
  }
?>
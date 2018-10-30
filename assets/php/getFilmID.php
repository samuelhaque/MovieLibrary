<?php

$flmTxt = $_REQUEST["t"];

function toSearchable($text){
	if(strpos($text, ' ') !== false){
		$text = str_replace(" ", "+", $text); 
	}
	return $text;
}

$flmTxt = toSearchable($flmTxt); 

$api = 'filmLiveSearch/?query='.$flmTxt.'&n=10';

include 'login.php';


function getValidID($arrayToSearch){
    return $arrayToSearch['films'][0]['film_id'];
}

if($body != null){
	$arrayToSearch = json_decode($body, true);
	$dsa = getValidID($arrayToSearch);
	echo $dsa; 
}else{
  echo 'EMPTY';
}

/*

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

/*
{"films":[{"film_id":249928,"imdb_id":1727824,"film_name":"Bohemian Rhapsody","other_titles":{"EN":"Bohemian Rhapsody"},"release_dates":[{"release_date":"2018-10-24","notes":"GBR"}],"timescount":29162,"duration":135,"age_rating":[{"rating":"12A ","age_rating_image":"https:\/\/assets.movieglu.com\/age_rating_logos\/uk\/12a.png","age_advisory":"moderate sex references, drug references, infrequent strong language"}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"US","medium":{"film_image":"https:\/\/image.movieglu.com\/249928\/249928h1.jpg","width":200,"height":300}}},"still":{"2":{"image_orientation":"landscape","medium":{"film_image":"https:\/\/image.movieglu.com\/249928\/249928h2.jpg","width":300,"height":199}}}}},{"film_id":277833,"imdb_id":1727824,"film_name":"Bohemian Rhapsody IMAX 2D","release_dates":[{"release_date":"2018-10-24","notes":"GBR"}],"timescount":1456,"duration":135,"age_rating":[{"rating":"12A ","age_rating_image":"https:\/\/assets.movieglu.com\/age_rating_logos\/uk\/12a.png","age_advisory":""}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"US","medium":{"film_image":"https:\/\/image.movieglu.com\/277833\/277833h1.jpg","width":200,"height":300}}},"still":{"2":{"image_orientation":"landscape","medium":{"film_image":"https:\/\/image.movieglu.com\/277833\/277833h2.jpg","width":300,"height":199}}}}}],"status":{"count":2,"state":"OK","method":"filmLiveSearch","message":null,"request_method":"GET","version":"STUD_30v200","territory":"UK","device_datetime_sent":"2018-10-28 10:32:13","device_datetime_used":"2018-10-28 10:32:13"}}249928
HTTP/1.1 200 OK
*/

?>


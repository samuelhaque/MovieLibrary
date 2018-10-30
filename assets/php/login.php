<?php 
####################
# REQUIRED HEADERS #
####################
// You can find the details below in the email you received when you registered for a MovieGlu evaluation account.
$api_endpoint = 'https://api-gate2.movieglu.com/';
$username = 'STUD_30'; // Example: $username = 'ABCD';
$api_key = 'eZDXd2WFBZ6XwH02EuGSx71cSNTBjKB05qN1BlGJ';  //Example: $api_key = 'AbCdEFG7CuTTc6KX76mI5aAoGtqbrGW2ga6B4jRg';
$basic_authorization = 'Basic U1RVRF8zMDpPa0dyWTJuSVpPbjU='; // Example: $basic_authorization = 'Basic UHSYGF4xNTpNOHdJQllxckYyN3y=';

$territory = 'UK'; // Territory chosen as part of your evaluation key request  (Options: UK, FR, ES, DE, US, CA, IE, IN)
$api_version = 'v200'; // API Version for evaluation - check documentation for later versions
$device_datetime = (new DateTime())->format('Y-m-d H:i:s'); // Current device date/time 
$geolocation = '53.380480;-1.478940'; // Device Geolocation. Note semicolon (;) used as separator. IMPORTANT: This MUST be a location in the territory you selected above. The sample location is set at: Leicester Square, London, UK

########
# cURL #
########

// Initialize a cURL session
$ch = curl_init();

// Assign cURL Settings
curl_setopt($ch, CURLOPT_URL, $api_endpoint . $api);
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Authorization: ' . $basic_authorization, 
  'client: ' . $username,
  'x-api-key: ' . $api_key,  
  'territory: ' . $territory,
  'api-version: ' .$api_version,
  'device-datetime: ' . $device_datetime,
  'geolocation: ' .$geolocation 
 ]
);

// Send cURL request 
$ret = curl_exec($ch);

// Get HTTP Response Code
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Separate Headers and Body 
$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$headers = substr($ret, 0, $header_size);
$body = substr($ret, $header_size);

// Close cURL request
curl_close($ch);

?>
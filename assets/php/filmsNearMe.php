<?php

$flmid = $_REQUEST["f"]; // 249928

$cinema =  $_REQUEST["c"]; // 44150

$release ="2018-10-28"; // 2018-10-28

$api = 'cinemaShowTimes/?film_id='.$flmid.'&cinema_id='.$cinema.'&date='.$release.'&sort=popularity';

include 'login.php'; 

if($body != null){

  $arrayToSearch = json_decode($body,true);

  echo json_encode($arrayToSearch);
}else{
  echo 'EMPTY';
}
/*
Showings


 "showings": {
                "Standard": {
                    "film_id": 249928,
                    "film_name": "Bohemian Rhapsody",
                    "times": [
                        {
                            "start_time": "10:05",
                            "end_time": "12:45"
                        },
                        {
                            "start_time": "10:30",
                            "end_time": "13:10"
                        },
                        {
                            "start_time": "13:10",
                            "end_time": "15:50"
                        },
                        {
                            "start_time": "13:40",
                            "end_time": "16:20"
                        },
                        {
                            "start_time": "16:20",
                            "end_time": "19:00"
                        },
                        {
                            "start_time": "16:50",
                            "end_time": "19:30"
                        },
                        {
                            "start_time": "19:30",
                            "end_time": "22:10"
                        },
                        {
                            "start_time": "20:00",
                            "end_time": "22:40"
                        }
                    ]
                }
            },
            "show_dates": [
                {
                    "date": "2018-10-28"
                },
                {
                    "date": "2018-10-29"
                },
                {
                    "date": "2018-10-30"
                },
                {
                    "date": "2018-10-31"
                },
                {
                    "date": "2018-11-01"
                }
            ]


*/
?>
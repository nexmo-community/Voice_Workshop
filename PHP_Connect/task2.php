<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Nexmo\Call\Call;

require 'vendor/autoload.php';

$app = new \Slim\App;

// Load the Nexmo App Credentials into $app vars
$app->privatekey = file_get_contents(__DIR__ . '/../private.key');
$app->appid = '9521a8e3-c721-48e5-a2c2-cc679ba57503';
    

#Serve a Main Page
$app->get('/', function (Request $request, Response $response) use ($app){
    
    return $response->write("PHP Connect");
});


#Serve the NCCO on the /ncco answer URL
$app->get('/ncco', function (Request $request, Response $response) use ($app) {
    
    $ncco = array([
        'action' => 'talk',
        'text' => 'Your call is being connected, please wait'],
        ['action'=>  'connect',
        'from' => '447520616161',
        'endpoint'=> array([
            'type' => 'phone',
            'number' => '447973994474'
            ])
        ]);

    return $response->withJson($ncco);
});

#Log the Events
$app->post('/event', function (Request $request, Response $response) use ($app) {
    
    $event = $request->getParsedBody();
    
    error_log("EVENT: ".json_encode($event));
    
    return $response->write("ok");
});

$app->run();
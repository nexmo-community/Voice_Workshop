<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

$app = new \Slim\App;

#Serve a Main Page
$app->get('/', function (Request $request, Response $response) {
    
    return $response->write("PHP Simple Talk");
});


#Serve the NCCO on the /ncco answer URL
$app->get('/ncco', function (Request $request, Response $response) {
    
    $ncco = array([
        'action'=>  'talk',
        'text'=> 'Hello World']);

    return $response->withJson($ncco);
});

#Log the Events
$app->post('/event', function (Request $request, Response $response) {
    
    $event = $request->getParsedBody();
    
    error_log("EVENT: ".json_encode($event));
    
    return $response->write("ok");
});

$app->run();
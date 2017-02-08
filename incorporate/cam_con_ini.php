<?php
/*
 * Copyright (C) 2015 CAMCAR
 *
 */

$devserverlist = array('127.0.0.1','::1','192.168.0.102','localhost');

if(!in_array($_SERVER['SERVER_NAME'], $devserverlist)){
    define("HOST", "50.63.156.22");
	define("USER", "medigraf_jagmax");
	define("PASSWORD", "BTJEtOJgHsJ9");
	define("DATABASE", "medigraf_jaguardb");
} else {
	define("HOST", "localhost");
	define("USER", "master");
	define("PASSWORD", "12345");
	define("DATABASE", "jaguardb");
}

define("SECURE", FALSE);//FOR DEVELOPMENT ONLY!!!!
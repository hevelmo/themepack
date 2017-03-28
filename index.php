<?php
ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);

/**
 *
 * [Initial V 1.0]
 *
**/

require_once "core/vendor/autoload.php";
include_once "core/environment/WaxConfigSet.php";

// Medigraf

include_once "core/Medigraf/Bases.php";
include_once "core/Medigraf/Router.php";
include_once "core/Medigraf/Curl.php";
include_once "core/Medigraf/Template.php";

// Site
//include_once "core/Site/Site.php";

$container = new \Slim\Container();

$container["notFoundHandler"] = function($c) {
    return function($request, $response) use ($c) {
        return $c["response"]
            ->withStatus(404)
            ->withHeader("Content-Type", "text/html")
            ->write((new Control404())->getTemplate()->render());
    };
};

$app = new \Slim\App($container);

/*
 ###################################################################################################
    ROOM
 ###################################################################################################
*/
    $app->get("/", "ControlHome:__invoke");
    $app->get("/pagina-no-encontrada", "Control404:__invoke");
    $app->get("/aviso-de-privacidad", "ControlPrivacyNotice:__invoke");
    //
    $app->run();
/*
 ###################################################################################################
    CONTROL PARENT CLASS
    Ésta es la clase padre para el manejo general de las rutas de Slim.
    Dicha clase provee los métodos necesarios para interactuar con la API
    Y para mostrar los templates crados vía Twig.
    Esta clase jamás se usará directamente por una ruta Slim,
    Sino que cada ruta Slim será manejada por una clase hija de ControlMaster.
 ###################################################################################################
*/
    abstract class ControlMaster {    
        // PROPERTIES 
        private $bases;
        private $router;
        private $curl;
        private $template;
        //private $site;
        // CONSTRUCT 
        function __construct($masterConfigArray, $twigConfig, $name) {
            //BASES
            $this->bases   = new Bases();
            //ROUTER
            $this->router   = new Router();
            //CURL
            $this->curl     = new Curl(_HOST . "api/v1/");
            //TEMPLATE
            $this->template = new Template(
                "templates/twig/interfaz",
                $name,
                array_merge(
                    array(
                        "cache" => "cache",
                        "debug" => "true"
                    ),
                    $twigConfig
                ),
                array_merge(
                    $this->bases->getConstants(),
                    $masterConfigArray
                )
            );
            //SITE
            //$this->site = new Site();
        }
        // GETTERS 
        public function getBases() {
            return $this->bases;
        }
        public function getRouter() {
            return $this->router;
        }
        public function getCurl() {
            return $this->curl;
        }
        public function getTemplate() {
            return $this->template;
        }
        /*
        public function getSite() {
            return $this->site;
        }
        */
        // ABSTRACTS     
        abstract public function __invoke($request, $response, $args);
    }
/*
 ###################################################################################################
    CONTORL CHILD CLASSES
 ###################################################################################################
*/
    // CONTROL 404
    class Control404 extends ControlMaster {
        function __construct() {
            parent::__construct(
                array(
                    "title" => "Página no encontrada",
                    "title_header" => "Página no encontrada"
                ),
                array(),
                "404/_404.twig"
            );
            /*
            // Facebook Metatags
            parent::getTemplate()->makeFacebookTags(
                "Land Rover Guadalajara y Country: Página no encontrada",
                "Land Rover Guadalajara y Country",
                "Land Rover Guadalajara y Country: Página no encontrada",
                _HOST . "img/logo/logo_jaguar.png"
            );
            */
        }
        public function __invoke($request, $response, $args) {
        }   
    }

    // CONTROL HOME
    class ControlHome extends ControlMaster {    
        function __construct() {
            parent::__construct(
                array(
                    "title" => "Composer",
                    "title_header" => "Composer"
                ),
                array(),
                "home/_home.twig"
            );
            /*
            // Facebook Metatags
            parent::getTemplate()->makeFacebookTags(
                "Land Rover Guadalajara y Country",
                "Land Rover Guadalajara y Country",
                "Land Rover Guadalajara y Country",
                _HOST . "img/logo/logo_jaguar.png"
            );
            */
        }
        public function __invoke($request, $response, $args) {
            parent::getTemplate()->display();
            //echo "<pre>", print_r(parent::getTemplate()->getMasterConfigArray()), "</pre>";
        }
    }
    /*
    // CONTROL PRIVACY NOTICE
    class ControlPrivacyNotice extends ControlMaster {
        function __construct() {
            parent::__construct(
                array(
                    "title" => "AVISO DE PRIVACIDAD",
                    "title_header" => "AVISO DE PRIVACIDAD"
                ),
                array(),
                "privacidad/_privacidad.twig"
            );
            //Facebook Metatags
            parent::getTemplate()->makeFacebookTags(
                "SEMINUEVOS PREMIUM: AVISO DE PRIVACIDAD", 
                "SEMINUEVOS PREMIUM", 
                "SEMINUEVOS PREMIUM: AVISO DE PRIVACIDAD",
                _HOST . "img/logo/logo_jaguar.png"
            );

        }
        public function __invoke($request, $response, $args) {
            parent::getTemplate()->display();
            //echo "<pre>", print_r(parent::getTemplate()->getMasterConfigArray()), "</pre>";
        }
    }
	*/
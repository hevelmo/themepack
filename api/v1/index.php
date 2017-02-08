<?php
/*
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, PUT, POST, GET, OPTIONS");
header("Access-Control-Request-Headers: x-requested-with, content-type, accept");
header("Access-Control-Allow-Headers: Content-Type");
*/

ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);

include_once "../../incorporate/db_connect.php";
include_once "../../incorporate/functions.php";
include_once "../../incorporate/queryintojson.php";
include_once '../Mandrill.php';

/**
 *
 * [Initial V 1.0]
 *
**/

require_once "../../core/vendor/autoload.php";
include_once "../../core/environment/WaxConfigSet.php";

// Medigraf

include_once "../../core/Medigraf/Bases.php";
//include_once "../../core/Medigraf/Invoker.php";
include_once "../../core/Medigraf/Router.php";
include_once "../../core/Medigraf/Consult.php";
include_once "../../core/Medigraf/Sender.php";
include_once "../../core/Medigraf/Template.php";

$container = new \Slim\Container();

$container["notFoundHandler"] = function($c) {
    return function($request, $response) use ($c) {
        return $c["response"]
            ->withStatus(404)
            ->withHeader("Content-Type", "text/html")
            ->write("No encontrado Handler");
    };
};

$app = new \Slim\App($container);

/**
 * [ROOM]
**/
    // INSERT MAX
    $app->post("/add/max", "InsertMax:__invoke");

    // CONTACT
    $app->post("/send/contacto", "SendContact:__invoke");

    // SERVICES
    $app->post("/send/servicio", "SendServices:__invoke");

    // FINANCING
    $app->post("/send/financiamiento", "SendFinancing:__invoke");

    // TESTDRIVE
    $app->post("/send/testdrive", "SendTestDrive:__invoke");

    $app->run();
/**
 *  [CONSULT PARENT CLASS]
 *      Ésta es la clase padre para el manejo general de las rutas de Slim.
 *      Dicha clase provee los métodos necesarios para interactuar con la base de datos
 *      que se haya configurado en el proyecto principal, para así poder hacer consultas
 *      sobre ella y obtener, agregar, modificar y eliminar información.
 *      Esta clase jamás se usará directamente por una ruta Slim,
 *      sino que cada ruta Slim será manejada por una clase hija de ConsultMaster.
**/
    abstract class ConsultMaster {
        // PROPERTIES
        private $bases;
        private $router;
        private $consult;
        // CONSTRUCT
        function __construct() {
            //BASES
            $this->bases   = new Bases();
            //ROUTER
            $this->router   = new Router();
            //Get an array arguments to the method
            $args       = func_get_args();
            //Get number of arguments
            $numArgs    = func_num_args();
            //Make a method name
            $methodName = "construct" . $numArgs;
            //If the method exists called it 
            if (method_exists($this, $methodName)) {
                call_user_func_array(array($this, $methodName), $args);
            //Otherwise
            } else {
            }
        }
        function construct0() {
            $this->construct5("", array(), array(), 0, false);
        }
        function construct1($properties) {
            $this->construct5(
                $properties["sql"], 
                $properties["params"], 
                $properties["structure"], 
                $properties["typeQuery"], 
                $properties["multilevel"]
            );
        }    
        function construct5($sql = "", $params = array(), $structure = array(), $typeQuery = 0, $multilevel = false) {
            $this->sql        = $sql;
            $this->params     = $params;
            $this->structure  = $structure;
            $this->typeQuery  = $typeQuery;
            $this->multilevel = $multilevel;
            //CONSULT
            $this->consult   = new Consult(
                "jagpa",
                getConnection(),
                $this->sql,
                $this->params,
                $this->structure,
                $this->typeQuery,
                $this->multilevel
            );
        }
        // GETTERS
        public function getBases() {
            return $this->bases;
        }    
        public function getRouter() {
            return $this->router;
        }    
        public function getConsult() {
            return $this->consult;
        }
        // ABSTRACTS
        abstract public function __invoke($request, $response, $args);    
    }
/**
 *  [CONSULT CHILD CLASS]
 *      En esta sección se declaran todas las clases hijas de ConsultlMaster.
 *      Cada clase hijo corresponde a una ruta de Slim declarada en la parte del Room.
 *      Así mismo cada clase hijo puede agregar funcionalidad extra a la proporcionada
 *      por el padre, según sea necesaria en cada una de ellas.
**/
    /*
     ###################################################################################################
        GET METHODS
     ###################################################################################################
    */
        // CONSULT SELECT HOME
        class ConsultHome extends ConsultMaster {
            function __construct() {
            }
            public function __invoke($request, $response, $args) {
            }
        }
    /*
     ###################################################################################################
        POST METHODS
     ###################################################################################################
    */
        // CONSULT INSERT VISITAS
        class InsertVisitas extends ConsultMaster {
            function __construct() {
                parent::__construct(array(
                    "sql" => "",
                    "params" => array(),
                    "structure" => array(),
                    "typeQuery" => 1,
                    "multilevel" => false
                ));
            }
            public function __invoke($request, $response, $args) {
                parent::getRouter()->setRouteParams($request, $response, $args);
                $property = parent::getRouter()->getProperty();
                //PARAMS
                parent::getConsult()->makeParams(array_merge(
                    $args, 
                    array(
                        "vis_ip" => $property->vis_ip,
                        "fecha" => date("o-m-d H:i:s")
                    )
                ));
                //SQL
                parent::getConsult()->setSql(
                    "INSERT INTO camVisitas(
                        VIS_Ip,
                        VIS_SEN_Id,
                        VIS_Fecha
                     ) VALUES (
                        :vis_ip,
                        :sen_id,
                        :fecha
                     )"
                );
                //EXECUT
                parent::getConsult()->insertQuery();
                parent::getConsult()->echoResultJSON();
            }
        }
        //CONSULT INSERT CONTACTOS
        class InsertMax extends ConsultMaster {
            function __construct() {
                parent::__construct(array(
                    "sql" => "",
                    "params" => array(),
                    "structure" => array(),
                    "typeQuery" => 1,
                    "multilevel" => false
                ));
            }
            public function __invoke($request, $response, $args) {
                parent::getRouter()->setRouteParams($request, $response, $args);
                $property = parent::getRouter()->getProperty();

                //echo "<pre>", print_r($property), "</pre>";
                //PARAMS
                parent::getConsult()->makeParams(array_merge(
                    $args, 
                    array(
                        "nombre" => $property->nombre,
                        "apellido" => $property->apellidos,
                        "correo" => $property->correo,
                        "telefono" => $property->telefono,
                        "agencia" => $property->agencia,
                        "producto" => $property->producto,
                        "mensaje" => $property->mensaje,
                        "fecha" => date("o-m-d H:i:s"),
                        "status" => 1
                    )
                ));
                //SQL
                parent::getConsult()->setSql(
                    "INSERT INTO jagMax(
                        MAX_Nombre,
                        MAX_Apellido,
                        MAX_Correo,
                        MAX_Telefono,
                        MAX_Agencia,
                        MAX_Producto,
                        MAX_Mensaje,
                        MAX_Fecha,
                        MAX_Status
                     ) VALUES (
                        :nombre,
                        :apellido,
                        :correo,
                        :telefono,
                        :agencia,
                        :producto,
                        :mensaje,
                        :fecha,
                        :status
                     )"
                );
                //EXECUT
                parent::getConsult()->insertQuery();
                parent::getConsult()->echoResultJSON();
            }
        }
/**
 *  [SEND PARENT CLASS]
 *      Ésta es la clase padre para el manejo general de envío de correos.
 *      Dicha clase provee los métodos necesarios para interactuar con Mandil.
 *      Esta clase jamás se usará directamente por una ruta Slim,
 *      Sino que cada ruta Slim será manejada por una clase hija de SendMaster.
**/
    abstract class SendMaster {
        // PROPERTIES
        private $router;
        private $sender;
        private $template;
        // CONSTRUCT
        function __construct($masterConfigArray, $twigConfig, $name) {
            //ROUTER
            $this->router   = new Router();
            //SENDER
            $this->sender   = new Sender(new Mandrill("IJKuV2iqtHNLdnn1DCSxxQ"));
            //TEMPLATE
            $this->template = new Template(
                "../../templates/twig/mensajes",
                $name,
                array_merge(
                    array(
                        "cache" => "../../cache",
                        "debug" => "true"
                    ), 
                    $twigConfig
                ), 
                $masterConfigArray
            );
        }
        //GETTERS
        public function getRouter() {
            return $this->router;
        }
        public function getSender() {
            return $this->sender;
        }
        public function getTemplate() {
            return $this->template;
        }
        // ABSTRACTS
        abstract public function __invoke($request, $response, $args);
    }
/**
 *  [SEND CHILD CLASS]
 *      En esta sección se declaran todas las clases hijas de SendMaster.
 *      Cada clase hijo corresponde a una ruta de Slim declarada en la parte del Room.
 *      Así mismo cada clase hijo puede agregar funcionalidad extra a la proporcionada
 *      por el padre, según sea necesaria en cada una de ellas.
**/
    // SEND CONTACT
    class SendContact extends SendMaster {
        function __construct() {
            parent::__construct(array(), array(), "contact.twig");
        }
        public function __invoke($request, $response, $args) {
            $mail = "hevelmo060683@gmail.com";
            /*
            $mail = "arivera@jaguargdl.com, arivera@guadalajara.jlr.com.mx";
            */
            $from_email = "noreply@max-app.net";
            $website = "http://jaguargdl.com/";

            parent::getRouter()->setRouteParams($request, $response, $args);
            $property = parent::getRouter()->getProperty();
            parent::getTemplate()->setMasterConfigArray((array) $property);
            parent::getSender()->__send(array(
                "html" => parent::getTemplate()->render(),
                "subject" => $property->producto,
                "from_email" => $from_email,
                "from_name" => $property->nombre . " " . $property->apellidos,
                "to" => array(
                    array(
                        "email" => $mail,
                        "name" => $property->agencia,
                        "type" => "to"
                    )
                ),
                "headers" => array(
                    "Reply-To" => $mail
                ),
                "tags" => array(
                    "orden-new-notificacion",
                    "jaguar-contact"
                ),
                "google_analytics_domains" => array(
                    $website
                ),
                "google_analytics_campaign" => $mail,
                "metadata" => array(
                    "website" => $website
                )
            ));
            echo changeArrayIntoJSON("jagpa", array("process" => "ok"));
        }
    }
    // SEND SERVICES
    class SendServices extends SendMaster {
        function __construct() {
            parent::__construct(array(), array(), "service.twig");
        }
        public function __invoke($request, $response, $args) {
            $mail = "hevelmo060683@gmail.com";
            /*
            $mail = "arivera@jaguargdl.com, arivera@guadalajara.jlr.com.mx";
            */
            $from_email = "noreply@max-app.net";
            $website = "http://jaguargdl.com/";

            parent::getRouter()->setRouteParams($request, $response, $args);
            $property = parent::getRouter()->getProperty();
            parent::getTemplate()->setMasterConfigArray((array) $property);
            parent::getSender()->__send(array(
                "html" => parent::getTemplate()->render(),
                "subject" => $property->producto,
                "from_email" => $from_email,
                "from_name" => $property->nombre . " " . $property->apellidos,
                "to" => array(
                    array(
                        "email" => $mail,
                        "name" => $property->agencia,
                        "type" => "to"
                    )
                ),
                "headers" => array(
                    "Reply-To" => $mail
                ),
                "tags" => array(
                    "orden-new-notificacion",
                    "jaguar-service"
                ),
                "google_analytics_domains" => array(
                    $website
                ),
                "google_analytics_campaign" => $mail,
                "metadata" => array(
                    "website" => $website
                )
            ));
            echo changeArrayIntoJSON("jagpa", array("process" => "ok"));
        }
    }
    // SEND FINANCING
    class SendFinancing extends SendMaster {
        function __construct() {
            parent::__construct(array(), array(), "financiamiento.twig");
        }
        public function __invoke($request, $response, $args) {
            $mail = "hevelmo060683@gmail.com";
            /*
            $mail = "arivera@jaguargdl.com, arivera@guadalajara.jlr.com.mx";
            */
            $from_email = "noreply@max-app.net";
            $website = "http://jaguargdl.com/";

            parent::getRouter()->setRouteParams($request, $response, $args);
            $property = parent::getRouter()->getProperty();
            parent::getTemplate()->setMasterConfigArray((array) $property);
            parent::getSender()->__send(array(
                "html" => parent::getTemplate()->render(),
                "subject" => "Financiamiento:  " . $property->producto,
                "from_email" => $from_email,
                "from_name" => $property->nombre . " " . $property->apellidos,
                "to" => array(
                    array(
                        "email" => $mail,
                        "name" => $property->agencia,
                        "type" => "to"
                    )
                ),
                "headers" => array(
                    "Reply-To" => $mail
                ),
                "tags" => array(
                    "orden-new-notificacion",
                    "jaguar-financing"
                ),
                "google_analytics_domains" => array(
                    $website
                ),
                "google_analytics_campaign" => $mail,
                "metadata" => array(
                    "website" => $website
                )
            ));
            echo changeArrayIntoJSON("jagpa", array("process" => "ok"));
        }
    }
    // SEND TESTDRIVE
    class SendTestDrive extends SendMaster {
        function __construct() {
            parent::__construct(array(), array(), "testdrive.twig");
        }
        public function __invoke($request, $response, $args) {
            $mail = "hevelmo060683@gmail.com";
            /*
            $mail = "arivera@jaguargdl.com, arivera@guadalajara.jlr.com.mx";
            */
            $from_email = "noreply@max-app.net";
            $website = "http://jaguargdl.com/";

            parent::getRouter()->setRouteParams($request, $response, $args);
            $property = parent::getRouter()->getProperty();
            parent::getTemplate()->setMasterConfigArray((array) $property);
            parent::getSender()->__send(array(
                "html" => parent::getTemplate()->render(),
                "subject" => "Prueba de Manejo:  " . $property->producto,
                "from_email" => $from_email,
                "from_name" => $property->nombre . " " . $property->apellidos,
                "to" => array(
                    array(
                        "email" => $mail,
                        "name" => $property->agencia,
                        "type" => "to"
                    )
                ),
                "headers" => array(
                    "Reply-To" => $mail
                ),
                "tags" => array(
                    "orden-new-notificacion",
                    "jaguar-test-drive"
                ),
                "google_analytics_domains" => array(
                    $website
                ),
                "google_analytics_campaign" => $mail,
                "metadata" => array(
                    "website" => $website
                )
            ));
            echo changeArrayIntoJSON("jagpa", array("process" => "ok"));
        }
    }
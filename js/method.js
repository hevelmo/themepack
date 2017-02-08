/* ------------------------------------------------------ *\
    [Variables] 'Zone'
\* ------------------------------------------------------ */
    var IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var GLOBALRootApi;
    GLOBALRootApi = "http://medigraf.com.mx/jaguar/";
/* ------------------------------------------------------ *\
    [functions] Alert Custom
\* ------------------------------------------------------ */
    function resetAlert () {
        alertify.set({
            labels : {
                ok     : "OK",
                cancel : "Cancel"
            },
            delay : 5000,
            buttonReverse : false,
            buttonFocus   : "ok"
        });
    }
/* ------------------------------------------------------ *\
    [Methods] isMobile
\* ------------------------------------------------------ */
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }
/* ------------------------------------------------------ *\
    [methods] dropdown
\* ------------------------------------------------------ */
    var dropdown_methods = {
        dropdown : function(event) {
            $(".inner-menu").not($("ul", this)).slideUp("fast")
            .next()
            $(this).find('ul').slideToggle("fast")
            .end();
        }
    }
/* ------------------------------------------------------ *\
    [Methods] openMenuMethods
\* ------------------------------------------------------ */
    var openMenuMethods = {
        clickOpenMenu : function () {
            $('nav').toggleClass('open-menu');
        },
        clickOpenModels : function () {
            var hideTimeout;
            clearTimeout(hideTimeout);
            $('.model-select-block', '.nav-1').slideDown();
        },
        clickOpenAgencies : function () {
            var hideTimeout;
            clearTimeout(hideTimeout);
            $('.agencies-select-block', '.nav-1').slideDown();
        }
    }
/* ------------------------------------------------------ *\
    [Methods] windowWidthMethod
\* ------------------------------------------------------ */
    var windowWidthMethod = {
        windowWidth: function() {
            var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

            if (windowWidth > 900) { // Medium breakpoint
                var heroCarousels = document.querySelectorAll(".HeroCarousel");
                var carousel, yOffset, element, carouselHeight;
                var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

                for (var i = 0; i < heroCarousels.length; i++) {
                    carousel = heroCarousels[i];
                    yOffset = 0;
                    element = carousel;

                    while (element) {
                        yOffset += (element.offsetTop - element.scrollTop + element.clientTop);
                        element = element.offsetParent;
                    }

                    carouselHeight = windowHeight - yOffset;

                    if (carouselHeight > 450) {
                        carousel.style.height = carouselHeight + "px";
                    }
                }
            }
        }
    }
/* ------------------------------------------------------ *\
    [Methods] init_hero_slider
\* ------------------------------------------------------ */
    var init_hero_slider = {
        hero_slider: function() {
            windowWidthMethod.windowWidth();
        }
    }
/* ------------------------------------------------------ *\
    [Methods] jagHome
\* ------------------------------------------------------ */
    var jagHome = {
        initialized: false,
        initialize: function() {
            if ( this.initizalized ) return;
            this.initialized = true;
            this.build();
        },
        build: function() {
            this.init_hero_slider();
        },
        _init: function() {
            init_hero_slider.hero_slider();
        }
    }
/* ------------------------------------------------------ *\
    [Methods] jagVehicles
\* ------------------------------------------------------ */
    var jagVehicles = {
        initialized: false,
        initialize: function() {
            if ( this.initizalized ) return;
            this.initialized = true;
            this.build();
        },
        build: function() {
            this.init_hero_slider();
        },
        _init: function() {
            init_hero_slider.hero_slider();
        }
    }
/* ------------------------------------------------------ *\
    [Methods] jagBlog
\* ------------------------------------------------------ */
    var jagBlog = {
        initialized: false,
        initialize: function() {
            if ( this.initizalized ) return;
            this.initialized = true;
            this.build();
        },
        build: function() {
        },
        _init: function() {
        }
    }
/* ------------------------------------------------------ *\
    [Methods] jagTestDrive
\* ------------------------------------------------------ */
    var jagTestDrive = {
        initialized: false,
        initialize: function() {
            if ( this.initizalized ) return;
            this.initialized = true;
            this.build();
        },
        build: function() {
            this.init_hero_slider();
        },
        _init: function() {
            init_hero_slider.hero_slider();
        }
    }
/* ------------------------------------------------------ *\
    [Methods] jagFinancin
\* ------------------------------------------------------ */
    var jagFinancing = {
        initialized: false,
        initialize: function() {
            if ( this.initizalized ) return;
            this.initialized = true;
            this.build();
        },
        build: function() {
            this.init_hero_slider();
        },
        _init: function() {
            init_hero_slider.hero_slider();
        }
    }
/* ------------------------------------------------------ *\
    [Methods] event_to_material
\* ------------------------------------------------------ */
    var set_data = {
        set_product: function(event) {
            get_data = JAG.getValue('#master-product');
            JAG.setValue('#jag_product', get_data);
            console.log(get_data);
        }
    }
/* ------------------------------------------------------ *\
    [Methods] testDriveForm
\* ------------------------------------------------------ */
    var testDriveForm = {
        handlerPromiseLeads: function(data) {
            var testDriveAddPromise;
            testDriveAddPromise = testDriveForm.addTestDrive();
            testDriveAddPromise.success(testDriveForm.handlesPromiseAddTestDrive);
            testDriveAddPromise.success(testDriveForm.handlerPromiseAddTestDrive);
        },
        handlerPromiseAddTestDrive: function (data1) {
            var testDriveSendPromise, jag_agn, rootApi;

            rootApi = JAG.getValue('#master-host');
            url_location = rootApi;
            
            jag_agn = JAG.getValue('#jag_agn');
            jag_product = JAG.getValue('#jag_producto');
            console.log(jag_agn, jag_product);

            resetAlert();
            alertify.set({
                labels: {
                    ok: 'Aceptar',
                    cancel: 'Cancelar'
                }
            });
            testDriveSendPromise = testDriveForm.sendTestDrive();
            testDriveSendPromise.success( function (data2) {
                ga('send', 'event', 'button-send-form-test-drive-contact', 'Prueba de Manejo: '+ jag_product, 'form-test-drive-contact');
                setTimeout(function () {
                    setTimeout(function () {
                        //$('#form-wrapper').fadeOut(1000);
                        $('.form-thanks').fadeIn(1000);
                        setTimeout(function() {
                            testDriveForm.resetTestDrive();
                            alertify.alert("¡Muchas gracias!<br>" + 
                                           "Hemos enviado su formulario exitosamente a un representante de la concesionaria " + jag_agn + ", " +
                                           "pronto se pondrá en contacto con usted para enviarle su cotización.", function(e) {
                                                $(location).attr('href', url_location); 
                                           });
                            alertify.success("Datos enviados.");
                        }, 1800);
                    }, 1800);
                }, 1400);
            });
            testDriveSendPromise.error( function (data2) {
                testDriveForm.resetTestDrive();
                alertify.error("No se han podido enviar los datos <br /> Inténtelo más tarde.");
            });
        },
        makeLeads: function () {
            var data, dataRenamed, bigMessage, get_data;
            data = $('#testdrive').serializeFormJSON();

            dataRenamed = JAG.renameArrayObjKeys([data], {
                "name": "nombre",
                "lastname": "apellidos",
                "email": "correo",
                "phone": "telefono",
                "agencie": "agencia",
                "product": "producto",
                "comment": "mensaje"
            });
            dataRenamed = dataRenamed[0];
            dataRenamed["business_max"] = $('#jag_agn').find(":selected").data("max-id"); //Max Id;            
            dataRenamed["news"] = "0";
            dataRenamed["origen_type"] = "2";
            dataRenamed["campaign_max"] = "Test Drive";
            dataRenamed["web_max"] = window.location.href;
            dataRenamed["exit_web"] = window.location.href;
            return dataRenamed;
        },
        sendLeads: function () {
            var data, postApi;
            data = testDriveForm.makeLeads();

            postApi = JAG.postalService("http://clicktolead.com.mx/api/v1/remote/action", data);
            return postApi;
        },
        addTestDrive: function () {
            var rootApi, postApi, data;
            data = $('#testdrive').serializeFormJSON();
            rootApi = JAG.getValue('#master-host');
            return JAG.postalService(GLOBALRootApi + urlsApi.add_max, data);
        },
        sendTestDrive: function () {
            var rootApi, postApi, data;
            data = $('#testdrive').serializeFormJSON();
            rootApi = JAG.getValue('#master-host');
            return JAG.postalService(GLOBALRootApi + urlsApi.snd_drv, data);
        },
        resetTestDrive: function () {
            var $btnSend, get_data;
            $btnSend = $('.send_contact_form');

            JAG.resetForm('#testdrive');
            
            $('#loader_send_icon').css('display', 'none');
            $btnSend.removeAttr('disabled');
        },
        fillingControl: function() {
            var validFieldName, dataFinancing, isFull, $btnSend;

            $btnSend = $('.send_contact_form');
            $("#loader_send_icon").css("display", "none");

            validFieldName = [
                'nombre', 'apellidos', 'correo', 'telefono', 'agencia', 'producto', 'mensaje'
            ];

            dataFinancing = $('#testdrive').serializeFormJSON();

            $btnSend.removeAttr('disabled');
        },
        clickSend: function (event) {
            var leadsPromise;
            formErrors = testDriveForm.niceValidation('.validate-required', '#testdrive-send');
            if (formErrors === 0) {
                leadsPromise = testDriveForm.sendLeads();
                leadsPromise.success(testDriveForm.handlerPromiseLeads);
                leadsPromise.error(testDriveForm.handlerPromiseLeads);
                /*
                testDriveForm.sendLeads();
                testDriveForm.addTestDrive();
                testDriveForm.sendTestDrive();
                */
            }
        },
        niceValidation: function (validateElement, btnSend) {
            var formErrors;
            $(btnSend).removeAttr("disabled");
            formErrors = 0;
            $(validateElement).each( function (idx) {
                if ( !$.validate_input( $(this) )) {
                    formErrors++;
                    $(this).focus();
                }
            });
            if ( formErrors === 0 ) {
                $(btnSend).css("cursor", "auto").prop("disabled", true);
                $("#loader_send_icon").css("display", "block");
            }
            return formErrors;
        }
    }
/* ------------------------------------------------------ *\
    [Methods] financingForm
\* ------------------------------------------------------ */
    var financingForm = {
        handlerPromiseLeads: function(data) {
            var financingAddPromise;
            financingAddPromise = financingForm.addFinancing();
            financingAddPromise.success(financingForm.handlesPromiseAddFinancing);
            financingAddPromise.success(financingForm.handlerPromiseAddFinancing);
        },
        handlerPromiseAddFinancing: function (data1) {
            var testDriveSendPromise, jag_agn, rootApi;

            rootApi = JAG.getValue('#master-host');
            url_location = rootApi;
            
            jag_agn = JAG.getValue('#jag_agn');
            jag_product = JAG.getValue('#jag_producto');
            console.log(jag_agn, jag_product);

            resetAlert();
            alertify.set({
                labels: {
                    ok: 'Aceptar',
                    cancel: 'Cancelar'
                }
            });
            financingSendPromise = financingForm.sendFinancing();
            financingSendPromise.success( function (data2) {
                ga('send', 'event', 'button-send-form-financing', 'Financiamiento: '+ jag_product, 'form-financing-contact');
                setTimeout(function () {
                    setTimeout(function () {
                        //$('#form-wrapper').fadeOut(1000);
                        $('.form-thanks').fadeIn(1000);
                        setTimeout(function() {
                            financingForm.resetFinancing();
                            alertify.alert("¡Muchas gracias!<br>" + 
                                           "Hemos enviado su formulario exitosamente a un representante de la concesionaria " + jag_agn + ", " +
                                           "pronto se pondrá en contacto con usted para enviarle su cotización.", function(e) {
                                                $(location).attr('href', url_location); 
                                           });
                            alertify.success("Datos enviados.");
                        }, 1800);
                    }, 1800);
                }, 1400);
            });
            financingSendPromise.error( function (data2) {
                financingForm.resetFinancing();
                alertify.error("No se han podido enviar los datos <br /> Inténtelo más tarde.");
            });
        },
        makeLeads: function () {
            var data, dataRenamed, bigMessage, get_data;
            data = $('#financing').serializeFormJSON();

            dataRenamed = JAG.renameArrayObjKeys([data], {
                "name": "nombre",
                "lastname": "apellidos",
                "email": "correo",
                "phone": "telefono",
                "agencie": "agencia",
                "product": "producto",
                "comment": "mensaje"
            });
            dataRenamed = dataRenamed[0];
            dataRenamed["business_max"] = $('#jag_agn').find(":selected").data("max-id"); //Max Id;            
            dataRenamed["news"] = "0";
            dataRenamed["origen_type"] = "2";
            dataRenamed["campaign_max"] = "Financiamiento";
            dataRenamed["web_max"] = window.location.href;
            dataRenamed["exit_web"] = window.location.href;
            return dataRenamed;
        },
        sendLeads: function () {
            var data, postApi;
            data = financingForm.makeLeads();

            postApi = JAG.postalService("http://clicktolead.com.mx/api/v1/remote/action", data);
            return postApi;
        },
        addFinancing: function () {
            var rootApi, postApi, data;
            data = $('#financing').serializeFormJSON();
            rootApi = JAG.getValue('#master-host');
            return JAG.postalService(GLOBALRootApi + urlsApi.add_max, data);
        },
        sendFinancing: function () {
            var rootApi, postApi, data;
            data = $('#financing').serializeFormJSON();
            rootApi = JAG.getValue('#master-host');
            return JAG.postalService(GLOBALRootApi + urlsApi.snd_fin, data);
        },
        resetFinancing: function () {
            var $btnSend, get_data;
            $btnSend = $('.send_contact_form');

            JAG.resetForm('#financing');
            
            $('#loader_send_icon').css('display', 'none');
            $btnSend.removeAttr('disabled');
        },
        fillingControl: function() {
            var validFieldName, dataFinancing, isFull, $btnSend;

            $btnSend = $('.send_contact_form');
            $("#loader_send_icon").css("display", "none");

            validFieldName = [
                'nombre', 'apellidos', 'correo', 'telefono', 'agencia', 'producto', 'mensaje'
            ];

            dataFinancing = $('#financing').serializeFormJSON();

            $btnSend.removeAttr('disabled');
        },
        clickSend: function (event) {
            var leadsPromise;
            formErrors = financingForm.niceValidation('.validate-required', '#financing-send');
            if (formErrors === 0) {
                leadsPromise = financingForm.sendLeads();
                leadsPromise.success(financingForm.handlerPromiseLeads);
                leadsPromise.error(financingForm.handlerPromiseLeads);
                /*
                financingForm.sendLeads();
                financingForm.addFinancing();
                financingForm.sendFinancing();
                */
            }
        },
        niceValidation: function (validateElement, btnSend) {
            var formErrors;
            $(btnSend).removeAttr("disabled");
            formErrors = 0;
            $(validateElement).each( function (idx) {
                if ( !$.validate_input( $(this) )) {
                    formErrors++;
                    $(this).focus();
                }
            });
            if ( formErrors === 0 ) {
                $(btnSend).css("cursor", "auto").prop("disabled", true);
                $("#loader_send_icon").css("display", "block");
            }
            return formErrors;
        }
    }
/* ------------------------------------------------------ *\
    [Methods] contactForm
\* ------------------------------------------------------ */
    var contactForm = {
        handlerPromiseLeads: function(data) {
            var contactAddPromise;
            contactAddPromise = contactForm.addContact();
            contactAddPromise.success(contactForm.handlesPromiseAddContact);
            contactAddPromise.success(contactForm.handlerPromiseAddContact);
        },
        handlerPromiseAddContact: function (data1) {
            var contactSendPromise, jag_agn, rootApi;

            rootApi = JAG.getValue('#master-host');
            url_location = rootApi;
            
            jag_agn = JAG.getValue('#jag_agn');
            jag_product = JAG.getValue('#jag_producto');
            console.log(jag_agn, jag_product);

            resetAlert();
            alertify.set({
                labels: {
                    ok: 'Aceptar',
                    cancel: 'Cancelar'
                }
            });
            contactSendPromise = contactForm.sendContact();
            contactSendPromise.success( function (data2) {
                ga('send', 'event', 'button-send-form--contact', jag_product, 'form-contact');
                setTimeout(function () {
                    setTimeout(function () {
                        //$('#form-wrapper').fadeOut(1000);
                        $('.form-thanks').fadeIn(1000);
                        setTimeout(function() {
                            contactForm.resetContact();
                            alertify.alert("¡Muchas gracias!<br>" + 
                                           "Hemos enviado su formulario exitosamente a un representante de la concesionaria " + jag_agn + ", " +
                                           "En breve nos contactaremos con usted.", function(e) {
                                                $(location).attr('href', url_location); 
                                           });
                            alertify.success("Datos enviados.");
                        }, 1800);
                    }, 1800);
                }, 1400);
            });
            contactSendPromise.error( function (data2) {
                contactForm.resetContact();
                alertify.error("No se han podido enviar los datos <br /> Inténtelo más tarde.");
            });
        },
        makeLeads: function () {
            var data, dataRenamed, bigMessage, get_data;
            data = $('#contacto').serializeFormJSON();

            dataRenamed = JAG.renameArrayObjKeys([data], {
                "name": "nombre",
                "lastname": "apellidos",
                "email": "correo",
                "phone": "telefono",
                "agencie": "agencia",
                "product": "producto",
                "comment": "mensaje"
            });
            dataRenamed = dataRenamed[0];
            dataRenamed["business_max"] = $('#jag_business_max').val(); //Max Id;            
            dataRenamed["news"] = "0";
            dataRenamed["origen_type"] = "2";
            dataRenamed["campaign_max"] = "Contacto";
            dataRenamed["web_max"] = window.location.href;
            dataRenamed["exit_web"] = window.location.href;
            //console.log(dataRenamed);
            return dataRenamed;
        },
        sendLeads: function () {
            var data, postApi;
            data = contactForm.makeLeads();

            postApi = JAG.postalService("http://clicktolead.com.mx/api/v1/remote/action", data);
            return postApi;
        },
        addContact: function () {
            var rootApi, postApi, data;
            data = $('#contacto').serializeFormJSON();
            rootApi = JAG.getValue('#master-host');
            return JAG.postalService(GLOBALRootApi + urlsApi.add_max, data);
        },
        sendContact: function () {
            var rootApi, postApi, data;
            data = $('#contacto').serializeFormJSON();
            rootApi = JAG.getValue('#master-host');
            return JAG.postalService(GLOBALRootApi + urlsApi.snd_con, data);
        },
        resetContact: function () {
            var $btnSend, get_data;
            $btnSend = $('.send_contact_form');

            JAG.resetForm('#contacto');
            
            $('#loader_send_icon').css('display', 'none');
            $btnSend.removeAttr('disabled');
        },
        fillingControl: function() {
            var validFieldName, dataFinancing, isFull, $btnSend;

            $btnSend = $('.send_contact_form');
            $("#loader_send_icon").css("display", "none");

            validFieldName = [
                'nombre', 'apellidos', 'correo', 'telefono', 'agencia', 'producto', 'mensaje'
            ];

            dataFinancing = $('#contacto').serializeFormJSON();

            $btnSend.removeAttr('disabled');
        },
        clickSend: function (event) {
            var leadsPromise;
            formErrors = contactForm.niceValidation('.validate-required', '#contact-send');
            if (formErrors === 0) {
                leadsPromise = contactForm.sendLeads();
                leadsPromise.success(contactForm.handlerPromiseLeads);
                leadsPromise.error(contactForm.handlerPromiseLeads);
                /*
                contactForm.sendLeads();
                contactForm.addContact();
                contactForm.sendTestDrive();
                */
            }
        },
        niceValidation: function (validateElement, btnSend) {
            var formErrors;
            $(btnSend).removeAttr("disabled");
            formErrors = 0;
            $(validateElement).each( function (idx) {
                if ( !$.validate_input( $(this) )) {
                    formErrors++;
                    $(this).focus();
                }
            });
            if ( formErrors === 0 ) {
                $(btnSend).css("cursor", "auto").prop("disabled", true);
                $("#loader_send_icon").css("display", "block");
            }
            return formErrors;
        }
    }
/* ------------------------------------------------------ *\
    [Methods] jagService
\* ------------------------------------------------------ */
    var jagService = {
        initialized: false,
        initialize: function() {
            if ( this.initizalized ) return;
            this.initialized = true;
            this.build();
        },
        build: function() {
            this.init_hero_slider();
        },
        _init: function() {
        }
    }
/* ------------------------------------------------------ *\
    [Methods] serviceGdlForm
\* ------------------------------------------------------ */
    var serviceGdlForm = {
        handlerPromiseLeads: function(data) {
            var serviceAddPromise;
            serviceAddPromise = serviceGdlForm.addService();
            serviceAddPromise.success(serviceGdlForm.handlesPromiseAddService);
            serviceAddPromise.success(serviceGdlForm.handlerPromiseAddService);
        },
        handlerPromiseAddService: function (data1) {
            var serviceSendPromise, jag_agn, rootApi;

            rootApi = JAG.getValue('#master-host');
            url_location = rootApi;
            
            jag_agn = JAG.getValue('#jag_agn');
            jag_product = JAG.getValue('#jag_producto');
            console.log(jag_agn, jag_product);

            resetAlert();
            alertify.set({
                labels: {
                    ok: 'Aceptar',
                    cancel: 'Cancelar'
                }
            });
            serviceSendPromise = serviceGdlForm.sendService();
            serviceSendPromise.success( function (data2) {
                ga('send', 'event', 'button-send-form-service', jag_product, 'form-service');
                setTimeout(function () {
                    setTimeout(function () {
                        //$('#form-wrapper').fadeOut(1000);
                        $('.form-thanks').fadeIn(1000);
                        setTimeout(function() {
                            serviceGdlForm.resetService();
                            alertify.alert("¡Muchas gracias!<br>" + 
                                           "Hemos enviado su formulario exitosamente a un representante de la concesionaria " + jag_agn + ", " +
                                           "En breve nos contactaremos con usted.", function(e) {
                                                $(location).attr('href', url_location); 
                                           });
                            alertify.success("Datos enviados.");
                        }, 1800);
                    }, 1800);
                }, 1400);
            });
            serviceSendPromise.error( function (data2) {
                serviceGdlForm.resetService();
                alertify.error("No se han podido enviar los datos <br /> Inténtelo más tarde.");
            });
        },
        makeLeads: function () {
            var data, dataRenamed, bigMessage, get_data;
            data = $('#servicio-gdl').serializeFormJSON();

            dataRenamed = JAG.renameArrayObjKeys([data], {
                "name": "nombre",
                "lastname": "apellidos",
                "email": "correo",
                "phone": "telefono",
                "agencie": "agencia",
                "product": "producto",
                "comment": "mensaje"
            });
            dataRenamed = dataRenamed[0];
            dataRenamed["business_max"] = $('#jag_agn').find(":selected").data("max-id"); //Max Id;            
            dataRenamed["news"] = "0";
            dataRenamed["origen_type"] = "2";
            dataRenamed["campaign_max"] = "Servicio";
            dataRenamed["web_max"] = window.location.href;
            dataRenamed["exit_web"] = window.location.href;
            return dataRenamed;
        },
        sendLeads: function () {
            var data, postApi;
            data = serviceGdlForm.makeLeads();

            postApi = JAG.postalService("http://clicktolead.com.mx/api/v1/remote/action", data);
            return postApi;
        },
        addService: function () {
            var rootApi, postApi, data;
            data = $('#servicio-gdl').serializeFormJSON();
            rootApi = JAG.getValue('#master-host');
            return JAG.postalService(GLOBALRootApi + urlsApi.add_max, data);
        },
        sendService: function () {
            var rootApi, postApi, data;
            data = $('#servicio-gdl').serializeFormJSON();
            rootApi = JAG.getValue('#master-host');
            console.log(data);
            return JAG.postalService(GLOBALRootApi + urlsApi.snd_srv, data);
        },
        resetService: function () {
            var $btnSend, get_data;
            $btnSend = $('.send_contact_form');

            JAG.resetForm('#servicio-gdl');
            
            $('#loader_send_icon').css('display', 'none');
            $btnSend.removeAttr('disabled');
        },
        fillingControl: function() {
            var validFieldName, dataFinancing, isFull, $btnSend;

            $btnSend = $('.send_contact_form');
            $("#loader_send_icon").css("display", "none");

            validFieldName = [
                'nombre', 'apellidos', 'correo', 'telefono', 'agencia', 'producto', 'mensaje'
            ];

            dataFinancing = $('#servicio-gdl').serializeFormJSON();

            $btnSend.removeAttr('disabled');
        },
        clickSend: function (event) {
            var leadsPromise;
            formErrors = serviceGdlForm.niceValidation('.validate-required-srv-gdl', '#service-gdl-send');
            if (formErrors === 0) {
                leadsPromise = serviceGdlForm.sendLeads();
                leadsPromise.success(serviceGdlForm.handlerPromiseLeads);
                leadsPromise.error(serviceGdlForm.handlerPromiseLeads);
                /*
                serviceGdlForm.sendLeads();
                serviceGdlForm.addContact();
                serviceGdlForm.sendTestDrive();
                */
            }
        },
        niceValidation: function (validateElement, btnSend) {
            var formErrors;
            $(btnSend).removeAttr("disabled");
            formErrors = 0;
            $(validateElement).each( function (idx) {
                if ( !$.validate_input( $(this) )) {
                    formErrors++;
                    $(this).focus();
                }
            });
            if ( formErrors === 0 ) {
                $(btnSend).css("cursor", "auto").prop("disabled", true);
                $("#loader_send_icon").css("display", "block");
            }
            return formErrors;
        }
    }
/* ------------------------------------------------------ *\
    [Methods] serviceCountryForm
\* ------------------------------------------------------ */
    var serviceCountryForm = {
        handlerPromiseLeads: function(data) {
            var serviceAddPromise;
            serviceAddPromise = serviceCountryForm.addService();
            serviceAddPromise.success(serviceCountryForm.handlesPromiseAddService);
            serviceAddPromise.success(serviceCountryForm.handlerPromiseAddService);
        },
        handlerPromiseAddService: function (data1) {
            var serviceSendPromise, jag_agn, rootApi;

            rootApi = JAG.getValue('#master-host');
            url_location = rootApi;
            
            jag_agn = JAG.getValue('#jag_agn');
            jag_product = JAG.getValue('#jag_producto');
            console.log(jag_agn, jag_product);

            resetAlert();
            alertify.set({
                labels: {
                    ok: 'Aceptar',
                    cancel: 'Cancelar'
                }
            });
            serviceSendPromise = serviceCountryForm.sendService();
            serviceSendPromise.success( function (data2) {
                ga('send', 'event', 'button-send-form-service', jag_product, 'form-service');
                setTimeout(function () {
                    setTimeout(function () {
                        //$('#form-wrapper').fadeOut(1000);
                        $('.form-thanks').fadeIn(1000);
                        setTimeout(function() {
                            serviceCountryForm.resetService();
                            alertify.alert("¡Muchas gracias!<br>" + 
                                           "Hemos enviado su formulario exitosamente a un representante de la concesionaria " + jag_agn + ", " +
                                           "En breve nos contactaremos con usted.", function(e) {
                                                $(location).attr('href', url_location); 
                                           });
                            alertify.success("Datos enviados.");
                        }, 1800);
                    }, 1800);
                }, 1400);
            });
            serviceSendPromise.error( function (data2) {
                serviceCountryForm.resetService();
                alertify.error("No se han podido enviar los datos <br /> Inténtelo más tarde.");
            });
        },
        makeLeads: function () {
            var data, dataRenamed, bigMessage, get_data;
            data = $('#servicio-country').serializeFormJSON();

            dataRenamed = JAG.renameArrayObjKeys([data], {
                "name": "nombre",
                "lastname": "apellidos",
                "email": "correo",
                "phone": "telefono",
                "agencie": "agencia",
                "product": "producto",
                "comment": "mensaje"
            });
            dataRenamed = dataRenamed[0];
            dataRenamed["business_max"] = $('#jag_agn').val(); //Max Id;            
            dataRenamed["news"] = "0";
            dataRenamed["origen_type"] = "2";
            dataRenamed["campaign_max"] = "Servicio";
            dataRenamed["web_max"] = window.location.href;
            dataRenamed["exit_web"] = window.location.href;
            console.log($('#jag_agn').find(":selected").data("max-id"));
            //return dataRenamed;
        },
        sendLeads: function () {
            var data, postApi;
            data = serviceCountryForm.makeLeads();

            postApi = JAG.postalService("http://clicktolead.com.mx/api/v1/remote/action", data);
            return postApi;
        },
        addService: function () {
            var rootApi, postApi, data;
            data = $('#servicio-country').serializeFormJSON();
            rootApi = JAG.getValue('#master-host');
            return JAG.postalService(GLOBALRootApi + urlsApi.add_max, data);
        },
        sendService: function () {
            var rootApi, postApi, data;
            data = $('#servicio-country').serializeFormJSON();
            rootApi = JAG.getValue('#master-host');
            return JAG.postalService(GLOBALRootApi + urlsApi.snd_srv, data);
        },
        resetService: function () {
            var $btnSend, get_data;
            $btnSend = $('.send_contact_form');

            JAG.resetForm('#servicio-country');
            
            $('#loader_send_icon').css('display', 'none');
            $btnSend.removeAttr('disabled');
        },
        fillingControl: function() {
            var validFieldName, dataFinancing, isFull, $btnSend;

            $btnSend = $('.send_contact_form');
            $("#loader_send_icon").css("display", "none");

            validFieldName = [
                'nombre', 'apellidos', 'correo', 'telefono', 'agencia', 'producto', 'mensaje'
            ];

            dataFinancing = $('#servicio-country').serializeFormJSON();

            $btnSend.removeAttr('disabled');
        },
        clickSend: function (event) {
            var leadsPromise;
            formErrors = serviceCountryForm.niceValidation('.validate-required-srv-cnt', '#service-country-send');
            if (formErrors === 0) {
                leadsPromise = serviceCountryForm.sendLeads();
                leadsPromise.success(serviceCountryForm.handlerPromiseLeads);
                leadsPromise.error(serviceCountryForm.handlerPromiseLeads);
                /*
                serviceCountryForm.sendLeads();
                serviceCountryForm.addContact();
                serviceCountryForm.sendService();
                */
            }
        },
        niceValidation: function (validateElement, btnSend) {
            var formErrors;
            $(btnSend).removeAttr("disabled");
            formErrors = 0;
            $(validateElement).each( function (idx) {
                if ( !$.validate_input( $(this) )) {
                    formErrors++;
                    $(this).focus();
                }
            });
            if ( formErrors === 0 ) {
                $(btnSend).css("cursor", "auto").prop("disabled", true);
                $("#loader_send_icon").css("display", "block");
            }
            return formErrors;
        }
    }
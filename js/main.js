$(document).ready(function() {

    /* ------------------------------------------------------ *\
        [METHOS Control] Serialize Form
    \* ------------------------------------------------------ */

    //This method change a form into a JSON
    $.fn.serializeFormJSON = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || "");
            } else {
                o[this.name] = this.value || "";
            }
        });
        return o;
    };

    /* ------------------------------------------------------ *\
        [METHOS Control] Currency Format
    \* ------------------------------------------------------ */

    Number.prototype.format = function(n, x) {
        var re = '(\\d)(?=(\\d{' + (x || 3) + '}) + ' + (n > 0 ? '\\.' : '$') + ')';
        return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
    };

    /* ------------------------------------------------------ *\
        EVENT CONTROL
    \* ------------------------------------------------------ */

    $('.model-select-block', '.nav-1').hide().css('visibility', 'visible');
    $('div.model-select-block li').mouseover(function() {
        $(this).siblings().stop().animate({
            opacity: 0.5
        }, 300);
    }).mouseout(function(){
        $(this).siblings().stop().animate({
            opacity: 1
        }, 300);
    });
    $('body').on('click', 'ul li:has(ul)', dropdown_methods.dropdown);

    $('.vehicles a','#menu').on('click', openMenuMethods.clickOpenModels);
    $('.agencies a','#menu').on('click', openMenuMethods.clickOpenAgencies);

    // VALIDATE FORM ITEMS
    $(domEl.div_recurrent).on('focusout', '.validate-required', function() { $.validate_input( $(this) ) });
    $(domEl.div_recurrent).on('focusout', '.validate-required-srv-gdl', function() { $.validate_input( $(this) ) });
    $(domEl.div_recurrent).on('focusout', '.validate-required-srv-cnt', function() { $.validate_input( $(this) ) });

    // SEND CONTACT
    $(domEl.div_recurrent).on("click", '#contact-send', contactForm.clickSend);

    // SEND SERVICES
    $(domEl.div_recurrent).on("click", '#service-gdl-send', serviceGdlForm.clickSend);
    $(domEl.div_recurrent).on("click", '#service-country-send', serviceCountryForm.clickSend);

    // SEND FINANCING
    $(domEl.div_recurrent).on("click", '#financing-send', financingForm.clickSend);

    // SEND TESTDRIVE
    $(domEl.div_recurrent).on("click", '#testdrive-send', testDriveForm.clickSend);


});
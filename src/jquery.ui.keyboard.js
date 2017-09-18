( function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define( [
            "jquery",
            "jquery-ui"
        ], factory );
    } else {

        // Browser globals
        factory( jQuery );
    }
}( function( $ ) {

    "use strict";

    $.widget( "ui.keyboard", {
        version: "@VERSION",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            classes: {
                "ui-keyboard": "ui-corner-all"
            },
            hide: true,
            show: true,

            // Callbacks
            accept: null,
            cancel: null,
            change: null,
            close: null,
            open: null
        }
    } );

    return $.ui.keyboard;

} ) );

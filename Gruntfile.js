module.exports = function( grunt ) {

    "use strict";

    var pkg = grunt.file.readJSON( "package.json" );

    grunt.initConfig( {

        pkg: pkg,

        clean: [ "dist/", "external/" ],

        bowercopy: {
            all: {
                options: {
                    destPrefix: "external"
                },
                files: {
                    "jquery/jquery.js": "jquery/dist/jquery.js",

                    "jquery-ui/jquery-ui.js": "jquery-ui/jquery-ui.js",
                    "jquery-ui/jquery-ui.css": "jquery-ui/themes/base/jquery-ui.css",
                    "jquery-ui/images": "jquery-ui/themes/base/images",

                    "qunit/qunit.js": "qunit/qunit/qunit.js",
                    "qunit/qunit.css": "qunit/qunit/qunit.css",

                    "requirejs/require.js": "requirejs/require.js"
                }
            }
        },

        copy: {
            build: {
                options: {
                    process: function( content ) {
                        return content.replace( /@VERSION/g, pkg.version );
                    }
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        filter: "isFile",
                        cwd: "src/",
                        src: [ "**" ],
                        dest: "dist/"
                    }
                ]
            }
        },

        concat: {
            extensions: {
                files: {
                    "dist/jquery.ui.keyboard.extension.js": [ "dist/jquery.ui.keyboard.extension.*.js" ]
                }
            },
            i18n: {
                files: {
                    "dist/jquery.ui.keyboard.i18n.js": [ "i18n/*.js" ]
                }
            }
        },

        uglify: {
            options: {
                banner: "/*! <%=pkg.name %> | <%= pkg.version %> | <%= grunt.template.today('yyyy-mm-dd') %> */\n"
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "dist/",
                        src: [ "**/*.js" ],
                        dest: "dist/",
                        ext: ".min.js",
                        extDot: "last"
                    }
                ]
            }
        },

        cssmin: {
            build: {
                src: "dist/jquery.ui.keyboard.css",
                dest: "dist/jquery.ui.keyboard.min.css"
            }
        }

    });

    grunt.loadNpmTasks( "grunt-bowercopy" );
    grunt.loadNpmTasks( "grunt-contrib-clean" );
    grunt.loadNpmTasks( "grunt-contrib-copy" );
    grunt.loadNpmTasks( "grunt-contrib-concat" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-cssmin" );

    grunt.registerTask( "default", [ "clean", "bowercopy", "copy", "concat:*", "uglify", "cssmin" ] );

};

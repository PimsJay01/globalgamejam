define(['jquery', 'crossroads', 'js/util/config', 'js/util/loading', 'js/util/storage'],function($, crs, config, loading, storage) {

    function ajaxDone(data, textStatus, jqXHR) {
        console.log(data);
    }

    function ajaxFail(jqXHR, textStatus, errorThrown) {
        //console.log(jqXHR);
        if(jqXHR.readyState == 0) {
            //showErrorMessage('Communication failed');
            return;
        }
        switch(jqXHR.status) {
            case 303 : // Redirect
                // if jqXHR.location == '/'
            case 401 : // Unauthorized
            case 403 : // Prohiben
                crs.parse('login');
        }
    }

    function ajaxAlways() {
        loading.hide();
    }

    function ajax(type, options) {
        if(options.url !== void 0) {
            loading.show();
            var url = config.baseUrl;
            if(storage.isDefined('apiVersion')) {
                url += storage.get('apiVersion') + '/';
            }
            var ajaxOptions = {
                url: url + options.url,
                type: type,
                dataType: 'json',
                xhrFields: {
                    withCredentials: false
                },
            };
            if(storage.isDefined('authToken')) {
                ajaxOptions.headers = {"X-AUTH-TOKEN": storage.get('authToken')};
            }
            if((options.data !== void 0) && !$.isEmptyObject(options.data)) {
                ajaxOptions.data = options.data;
            }

            var done = ajaxDone;
            if(typeof options.done === 'function') {
                done = options.done;
            }

            var fail = ajaxFail;
            if(typeof options.fail === 'function') {
                fail = options.fail;
            }

            var always = ajaxAlways;
            if(typeof options.always === 'function') {
                always = function() {
                    ajaxAlways();
                    options.always();
                }
            }

            //console.log(ajaxOptions);
            $.ajax(ajaxOptions)
                .done(done)
                .fail(fail)
                .always(always);
        }
    }

    return {
        get: function(options) {
            ajax('get', options);
        },
        post: function(options) {
            ajax('post', options);
        }
    }
});

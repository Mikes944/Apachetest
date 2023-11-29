#Apache file being created to test GitHub. 
#This is to send a quick "Hello World" when it is used. 
#The coding of the webserver was borrowed from: "https://github.com/seratch/apache-module-samples/blob/master/helloworld/mod_helloworld.c"

#include "httpd.h"
#include "http_config.h"
#include "http_protocol.h"
#include "ap_config.h"

static int helloworld_handler(request_rec *req)
{
    if (strcmp(req->handler, "helloworld")) {
        return DECLINED;
    }
    if (!req->header_only) {
        ap_rputs("{\"message\": \"Hello world!\"}\n", req);
    }
    req->content_type = "application/json;charset=UTF-8";

    // ap_table_set is too old API
    apr_table_set(req->headers_out, "X-Content-Type-Options", "nosniff");

    return OK;
}

static void helloworld_register_hooks(apr_pool_t *p)
{
    printf("\n ** helloworld_register_hooks  **\n\n");
    ap_hook_handler(helloworld_handler, NULL, NULL, APR_HOOK_MIDDLE);
}

/* Dispatch list for API hooks */
module AP_MODULE_DECLARE_DATA helloworld_module = {
    STANDARD20_MODULE_STUFF, 
    NULL, /* create per-dir    config structures */
    NULL, /* merge  per-dir    config structures */
    NULL, /* create per-server config structures */
    NULL, /* merge  per-server config structures */
    NULL, /* table of config file commands       */
    helloworld_register_hooks  /* register hooks */
};

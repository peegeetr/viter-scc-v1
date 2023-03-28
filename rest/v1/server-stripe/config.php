<?php
// PFM Stripe

// live key
define("STRIPE_FWC_PK_LIVE", "");
define("STRIPE_FWC_SK_LIVE", "");

// test key
define("STRIPE_FWC_PK_TEST", "");
define("STRIPE_FWC_SK_TEST", "");

// // development local
// define("STRIPE_SUCCESS_URL", "http://localhost:3000/donate/thank-you");
// define("STRIPE_CANCEL_URL", "http://localhost:3000/donate");

// // development online staging
define("STRIPE_SUCCESS_URL", "https://www.thefrontline.asia/thank-you");
define("STRIPE_CANCEL_URL", "https://www.thefrontline.asia");

// // production online
// define("STRIPE_SUCCESS_URL", "https://www.thefrontline.asia/donate/thank-you");
// define("STRIPE_CANCEL_URL", "https://www.thefrontline.asia/donate");

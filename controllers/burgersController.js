var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
// Default the route to home page
router.get('/',function(req,res){
    res.redirect("/burgers");
});
// Get burgers
router.get('/burgers',function(req,res){
    burger.select(function(data){
        var hbsObject = { burgers: data };
        res.render('index',hbsObject);
    });
});
//Add burger
router.post("/burgers/create", function (req, res) {
    burger.create(["burger_name"], [req.body.burger_name], function (result) {
        res.redirect("/burgers");
    });
});
//devour burger - update
router.put("/burgers/update/:id", function (req, res) {
    var condition = "id = ${req.params.id}";

    burger.update(
        {
            'devoured': req.body.devoured },
        condition,
        function (data) {
           res.redirect('/burgers');

        }
    );
});

// Export routes for server.js to use.
module.exports = router;

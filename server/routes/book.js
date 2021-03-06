let express = require('express');
let router = express.Router();

// enable jwt
let jwt = require('jsonwebtoken');

let passport = require('passport');

// Connect to book controller
let bookController = require('../controllers/book');

// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Book List page - READ operation. */
router.get('/', bookController.displayBookList);

/* GET Route for displaying the Add page - CREATE operation. */
//router.get('/add', requireAuth, bookController.displayAddPage);

/* POST Route for processing the Add page - CREATE operation. */
router.post('/add', passport.authenticate('jwt', {session: false}), bookController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE operation. */
//router.get('/edit/:id', requireAuth, bookController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE operation. */
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), bookController.processEditPage);

/* GET Route to perform Deletion - DELETE operation. */
router.get('/delete/:id', passport.authenticate('jwt', {session: false}), bookController.performDelete);

module.exports = router;
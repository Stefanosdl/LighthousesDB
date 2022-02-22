var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Αυτή η ενέργεια δεν επιτρέπεται για τον συγκεκριμένο χρήστη!");
  res.redirect('back');
}

module.exports = middlewareObj;

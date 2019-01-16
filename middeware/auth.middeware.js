var Student = require('../Models/student.model');

module.exports.requireAuth = async (req,res,next)=>{
    if(!req.signedCookies.IdStudent){
        res.redirect('/auth/login');
        return;
    }

    var student = await Student.findById(req.signedCookies.IdStudent);
    if(!student){
        res.redirect('/auth/login');
        return;
    };

    res.locals.student = student;
    
    next();

}
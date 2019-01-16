var Student = require('../Models/student.model');

module.exports.login = (req, res) => {

    if (req.signedCookies.IdStudent) {
        res.clearCookie('IdStudent');
    }
    res.render('auth/login');
};

module.exports.postLogin = async(req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    var student = await Student.findOne({ username: username });

    if (!student) {
        res.render('auth/login', {
            errors: [
                'Người dùng không tồn tại.'
            ],
            values: req.body
        });
        return;
    };

    if (student._doc.password != password) {
        res.render('auth/login', {
            errors: [
                'Sai mật khẩu.'
            ],
            values: req.body
        });
        return;
    };

    res.cookie('IdStudent', student._id, {
        signed: true
    });


    res.redirect('/users');

}
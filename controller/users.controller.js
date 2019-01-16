var Student = require('../Models/student.model');

module.exports.index = async(req, res, next) => {
    var students = await Student.find();
    res.render('users/index', {
        students: students
    });
};

// Tìm kiếm học sinh theo tên
module.exports.search = async(req, res, next) => {
    var q = req.query.q;
    var students = await Student.find();
    var matchStudent = students.filter(function(student) {
        return student.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
    });
    res.render('users/index', {
        students: matchStudent,
        query: q
    });

}

// Xem thông tin tài khoản
module.exports.infoUser = async(req, res, next) => {
    var students = await Student.find();
    res.render('users/infousers', {
        students: students
    });
}

module.exports.create = async(req, res, next) => {
    res.render('users/create');
}


// Thêm sinh viên mới /

module.exports.postCreate = async(req, res, next) => {

    var father = {
        nameFather: req.body.nameFather,
        phoneF: req.body.phoneF,
        jobF: req.body.jobF,
        yearF: req.body.yearF,
        countryF: req.body.countryF
    };
    var mother = {
        nameMother: req.body.nameMother,
        PhoneM: req.body.phoneM,
        JobM: req.body.JobM,
        yearM: req.body.yearM,
        countryM: req.body.countryM
    }
    var parent = [father, mother];


    var student = {
        name: req.body.name,
        gender: req.body.gender,
        date: req.body.date,
        parent: parent,
        country: req.body.country

    }

    let newStudent = new Student(student);

    newStudent.save(function(err, savedStudent) {
        if (err) {
            console.log('err');
            console.error(err);
        }
    });

    res.redirect('/users');
}

// module.exports.logOut = (req, res) => {

// }

// Hiển thị thông tin ca nhân
module.exports.get = async(req, res, next) => {
    var id = req.params.id;
    var student = await Student.findById(id);
    res.render('users/view', {
        student: student
    });
};

// Cập nhập thông tin cá nhân
module.exports.update = async(req, res, next) => {
    var id = req.params.id;
    var student = await Student.findById(id);
    res.render('users/update', {
        student: student
    });
};


// Cập Nhập thông tin cá nhân và lưu lại vào db
module.exports.postUpdate = async(req, res, next) => {
    var id = req.body.id;
    var student = await Student.findById(id);
    var father = {
        nameFather: req.body.nameFather,
        phoneF: req.body.phoneF,
        jobF: req.body.jobF,
        yearF: req.body.yearF,
        countryF: req.body.countryF
    };
    var mother = {
        nameMother: req.body.nameMother,
        PhoneM: req.body.phoneF,
        JobM: req.body.JobM,
        yearM: req.body.yearM,
        countryM: req.body.countryM
    }
    var parents = [father, mother];

    student.name = req.body.name;
    student.gender = req.body.gender;
    student.date = req.body.date;
    student.parent = parents;
    student.country = req.body.country

    await student.save();
    res.redirect('/users');
}


// Xoá 1 học viên 
module.exports.delete = async(req, res, next) => {
    let id = req.params.id;
    await Student.findByIdAndRemove(id);

    res.redirect('/users');
}
/**
 * StaffsController
 *
 * @description :: Server-side logic for managing staffs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const moment = require('moment');
module.exports = {
    staff_upload_avatar: function (req, res) {
        req.file('avatar').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/uploads/avatar')
        }, function (err, uploadedFiles) {
            if (err) return console.log(err);
            if (uploadedFiles.length > 0) {
                var avatar = require('path').basename(uploadedFiles[0].fd);
                return res.json({
                    status: 'success',
                    message: 'Upload avatar thành công',
                    avatar: avatar
                });
            }
        });
    },
    addStaff: function (req, res) {
        var staff_room_id = req.param('staff_room_id'),
            staff_position_id = req.param('staff_position_id'),
            staff_fullname = req.param('staff_fullname'),
            staff_birthday = req.param('staff_birthday'),
            staff_address = req.param('staff_address'),
            staff_phone = req.param('staff_phone'),
            staff_email = req.param('staff_email'),
            staff_sex = req.param('staff_sex'),
            staff_avatar = req.param('staff_avatar');
        if (!staff_room_id || staff_room_id === "" || staff_room_id <= 0) {
            return res.json({
                status: 'error',
                message: 'Phòng không hợp lệ'
            })
        }
        if (!staff_position_id || staff_position_id === "" || staff_position_id <= 0) {
            return res.json({
                status: 'error',
                message: 'Vị trí không hợp lệ'
            })
        }
        if (!staff_fullname || staff_fullname === "") {
            return res.json({
                status: 'error',
                message: 'Tên nhân viên không hợp lệ'
            })
        }
        if (!staff_birthday || staff_birthday === "") {
            return res.json({
                status: 'error',
                message: 'Ngày sinh không hợp lệ'
            })
        }
        if (!staff_address || staff_address === "") {
            return res.json({
                status: 'error',
                message: 'Địa chỉ không hợp lệ'
            })
        }
        if (!staff_phone || staff_phone === "") {
            return res.json({
                status: 'error',
                message: 'Số điện thoại không hợp lệ'
            })
        }
        if (!staff_email || staff_email === "") {
            return res.json({
                status: 'error',
                message: 'Email không hợp lệ'
            })
        }
        if (!staff_sex || staff_sex === "") {
            return res.json({
                status: 'error',
                message: 'Giới tính không hợp lệ'
            })
        }
        if (!staff_avatar || staff_avatar === "") {
            return res.json({
                status: 'error',
                message: 'Bạn chưa chọn ảnh đại diện'
            })
        }
        let bd = staff_birthday.split('/')[2] + "-" + staff_birthday.split('/')[1] + "-" + staff_birthday.split('/')[0]; // ['dd','mm','yyyy'] hàm cắt
        //console.log('Đã format'+moment(bd).format('YYYY-MM-DD'));
        staff_birthday = moment(bd).format('YYYY-MM-DD');
        Staffs.create({
            staff_room_id,
            staff_position_id,
            staff_fullname,
            staff_birthday,
            staff_address,
            staff_phone,
            staff_email,
            staff_sex,
            staff_avatar
        }).exec(function (err, created) {
            if (err) {
                return console.log(err)
            } if (created) {
                return res.json({
                    status: 'success',
                    message: 'Thêm nhân viên thành công'
                });
            }
        })
    },
    list_Staff: function (req, res) {
        var sql = "SELECT staffs.staff_id, staffs.staff_fullname,DATE_FORMAT(staff_birthday,'%d/%m/%Y') as staff_birthday,staffs.staff_address,staffs.staff_phone,staffs.staff_email,staffs.staff_sex,staffs.staff_avatar,rooms.room_id,positions.position_id , staffs.createdAt FROM staffs LEFT JOIN rooms ON staffs.staff_room_id = rooms.room_id LEFT JOIN positions ON staffs.staff_position_id = positions.position_id"
        Staffs.query(sql, function (err, results) {
            if (err) {
                return console.log(err);
            }
            return res.json({
                status: 'success',
                message: 'Get danh sách nhân viên thành công',
                staffs: results,
            });

        });
    },
    delStaff: function (req, res) {
        var staff_id = req.param('staff_id');
        if (!staff_id || staff_id === '' || staff_id <= 0) {
            return res.json({
                status: 'error',
                message: 'ID nhân viên gửi lên không hợp lệ'
            })
        }
        Staffs.destroy({ staff_id: staff_id }).exec(function (err) {
            if (err) {
                console.log(err);
            }
            return res.json({
                status: 'success',
                message: 'Xóa nhân viên thành công',
            })
        })
    },
    updateStaff: function (req, res) {
        var staff_id = req.param('staff_id'),
            staff_room_id = req.param('staff_room_id'),
            staff_position_id = req.param('staff_position_id'),
            staff_fullname = req.param('staff_fullname'),
            staff_birthday = req.param('staff_birthday'),
            staff_address = req.param('staff_address'),
            staff_phone = req.param('staff_phone'),
            staff_email = req.param('staff_email'),
            staff_avatar = req.param('staff_avatar'),
            staff_sex = req.param('staff_sex');
        Staffs.findOne({ staff_id }).exec(function (err, find) {
            if (err) {
                res.json({
                    status: 'error',
                    message: 'Không tìm thấy ID bạn gửi lên'
                })
            }
            if (find) {              
                let bd = staff_birthday.split('/')[2] + "-" + staff_birthday.split('/')[1] + "-" + staff_birthday.split('/')[0]; // ['dd','mm','yyyy'] hàm cắt
                //console.log('Đã format'+moment(bd).format('YYYY-MM-DD'));
                staff_birthday = moment(bd).format('YYYY-MM-DD');
                Staffs.update({
                    staff_id
                }, {
                        staff_room_id,
                        staff_position_id,
                        staff_fullname,
                        staff_birthday,
                        staff_address,
                        staff_phone,
                        staff_email,
                        staff_sex,
                        staff_avatar
                    }).exec(function (err, updated) {
                        if (err) {
                            console.log(err);
                        }
                        if (updated) {
                            res.json({
                                status: 'success',
                                message: 'Cập nhật thông tin thành công'
                            })
                        }
                    })
            }
        })
    }
};


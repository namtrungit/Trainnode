/**
 * PositionsController
 *
 * @description :: Server-side logic for managing positions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add_position: function (req, res) {
        var position_name = req.param('position_name')
        if (!position_name || position_name === '') {
            return res.json({
                status: 'error',
                message: 'Bạn chưa nhập tên vị trí'
            })
        }
        Positions.create({ position_name: position_name }).exec(function (err, created) {
            if (err) {
                return console.log(err)
            }
            if (created) {
                return res.json({
                    status: 'success',
                    message: 'Thêm vị trí thành công'
                });
            }
        });
    },
    get_position: function (req, res) {
        Positions.find().exec(function (err, finds) {
            if (err) { console.log(err) }
            if (finds) {
                return res.json({
                    status: 'success',
                    positions: finds
                })
            }
        })
    },
    del_position: function (req, res) {
        var position_id = req.param('position_id')
        if (!position_id || position_id === '') {
            return res.json({
                status: 'error',
                message: 'ID không hợp lệ'
            })
        }
        Positions.destroy({ position_id: position_id }).exec(function (err) {
            if (err) {
                return console.log(err)
            }
            return res.json({
                status: 'success',
                message: 'Xóa thành công'
            })
        })
    }
};


/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  //User
  'POST /users/user': 'UsersController.user_create',
  'GET /users/user': 'UsersController.user_profile',
  'PUT /users/user': 'UsersController.user_update',
  'DELETE /users/user': 'UsersController.user_delete',
  'POST /users/login': 'UsersController.login',
  'PUT /users/update-password': 'UsersController.user_change_password',
  'POST /test': 'UsersController.decode',

  //RoomsController
  'POST /rooms/add-room': 'RoomsController.add_room',
  'GET /rooms/get-room': 'RoomsController.get_room',
  'DELETE /rooms/del-room': 'RoomsController.del_room',

  //PositionController
  'POST /positions/add-position': 'PositionsController.add_position',
  'GET /positions/get-position': 'PositionsController.get_position',
  'DELETE /positions/del-position': 'PositionsController.del_position',

  //Staff
  'POST /staffs/upload-avatar': 'StaffsController.staff_upload_avatar',
  'POST /staffs/add-staff': 'StaffsController.addStaff',
  'GET /staffs/list-staff': 'StaffsController.list_Staff',
  'DELETE /staffs/del-staff': 'StaffsController.delStaff',
  'PUT /staffs/update-staff': 'StaffsController.updateStaff',
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
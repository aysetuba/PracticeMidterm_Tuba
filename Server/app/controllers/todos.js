var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/todos').get(function (req, res, next) {
        logger.log('info', 'Get all users');
        res.status(200).json({
           message: 'Get all users'
           //res.status(200).json(result)
        });
    });
    router.route('/todos/:id').get(function (req, res, next) {
        logger.log('info', 'Get user %s', req.params.id);

        res.status(200).json({message:'Get User', id: req.params.id
        });
    });

    router.route('/todos').post(function(req, res, next){
        console.log(req.body);
        var todos = req.body.todos;
  
        var obj = {'todos' : todos};
      res.status(201).json(obj);
  });
  
//   router.put('/todos', asyncHandler(async (req, res) => {
//     logger.log('info', 'Updating user');
//     await User.findOneAndUpdate({
//             _id: req.body._id
//         }, req.body, {
//             new: true
//         })
//         .then(result => {
//             res.status(200).json(result);
//         })
// }));
// router.delete('/todos/:id', asyncHandler(async (req, res) => {
//     logger.log('info', 'Deleting todo %s', req.params.id);
//     await User.remove({
//             _id: req.params.id
//         })
//         .then(result => {
//             res.status(200).json(result);
//         })
// }));

};
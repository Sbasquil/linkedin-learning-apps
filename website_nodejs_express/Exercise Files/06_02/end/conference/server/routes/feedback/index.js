const express = require('express');

const router = express.Router();

module.exports = (param) => {

    const { feedbackService } = param;

    router.get('/', async (req, res, next) => {
        try {
            const feedbacklist = await feedbackService.getList();
            return res.render('feedback', {
                page: 'Feedback',
                feedbacklist,
            });
        } catch(err) {
            return err;
        }
    });

    router.post('/', (req, res, next) => {
        console.log(req.body);
        return res.send('Form sent');
    });

    return router;
};
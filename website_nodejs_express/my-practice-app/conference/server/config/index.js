const path = require('path');

module.exports = {
    development: {
        sitename: 'Roux Meetups [development]',
        data: {
            speakers: path.join(__dirname, '../data/speakers.json'),
            feedback: path.join(__dirname, '../data/feedback.json')
        }
    },
    production: {
        sitename: 'Roux Meetups',
        data: {
            speakers: path.join(__dirname, '../data/speakers.json'),
            feedback: path.join(__dirname, '../data/feedback.json')
        }
    }
}
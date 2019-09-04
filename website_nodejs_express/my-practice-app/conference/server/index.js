const express = require('express');
const createError = require('http-errors');
const path = require('path');                       //core node module. handly for path helpers. 
const bodyParser = require('body-parser');
const configs = require('./config');
const SpeakerService = require('./services/SpeakerService')
const FeedbackService = require('./services/FeedbackService')
const app = express();

const config = configs[app.get('env')]              //getting config files depending on production/devel mode

const speakerService = new SpeakerService(config.data.speakers)
const feedbackService = new FeedbackService(config.data.feedback)

app.set('view engine', 'pug');                      //Project: Maybe Rebuild with React instead of pug later. not sure if this is a thing. 
if(app.get('env') === 'development'){   
    app.locals.pretty = true;
}
app.locals.title = config.sitename;
app.set('views', path.join(__dirname, './views'));

app.use((req, res, next) => {
    res.locals.rendertime = new Date();
    return next();
})

const routes = require('./routes');
app.use(express.static('public'));                  //can list public like this as its just in the root directory. this is to server the css and static files. shortcut solution
app.use(bodyParser.urlencoded({extended: true}))
app.get('favicon.ico', (req, res, next) => {        //handler for the favicon in the tab that sometimes gets requested, this prevents 404 error
    return res.sendStatus(204);
})

app.use(async (req, res, next) => {
    try {
        const names = await speakerService.getNames();
        res.locals.speakerNames = names;            //set global template variable
        return next();
    } catch(err) {
        return next(err);
    };

})

app.use('/', routes({                               //middleware for building the routes
    speakerService,                                 //shorthand for speakerService: speakerService in this context
    feedbackService                                  
}));                             

app.use((req, res, next) => {                       //catch-all for throwing error if no routes fit
    return next(createError(404, 'File not found'));
});

app.use((err, req, res, next) => {                  //real error handler. takes 4 args. 
    res.locals.message = err.message;               //makes error message available in the template
    const status = err.status || 500;               
    res.locals.status = status;
    res.locals.error = req.app.get('env') === 'development' ? err : {};    //make errors available in devel mode only
    res.status(status);
    res.render('error');
})

app.listen(3000);

module.export = app;
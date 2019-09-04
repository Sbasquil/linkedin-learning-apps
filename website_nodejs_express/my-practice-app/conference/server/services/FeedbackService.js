const fs = require('fs');               //used to load the data from the file
const util = require('util');           //for the helper that is used to modify readfile function

const readFile = util.promisify(fs.readFile); //patching the readfile function to use promises and async await
const writeFile = util.promisify(fs.writeFile); //patching the readfile function to use promises and async await


class FeedbackService {
    constructor(datafile){
        this.datafile = datafile;
    }

    async getData() {
        const data = await readFile(this.datafile, 'utf8');
        return JSON.parse(data);
    }
    
    async getList() {
        const data = await this.getData();
        return data;
    }

    async addEntry(name, title, message) {
        const data = await this.getData();
        data.unshift({name, title, message});
        return writeFile(this.datafile, JSON.stringify(data))
    }
}

module.exports = FeedbackService
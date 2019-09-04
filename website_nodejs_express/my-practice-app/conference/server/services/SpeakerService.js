const fs = require('fs');               //used to load the data from the file
const util = require('util');           //for the helper that is used to modify readfile function

const readFile = util.promisify(fs.readFile); //patching the readfile function to use promises and async await

class SpeakerService {
    constructor(datafile){
        this.datafile = datafile;
    }

    async getData() {
        const data = await readFile(this.datafile, 'utf8');
        return JSON.parse(data).speakers
    }

    async getNames() {
        const data = await this.getData();

        return data.map((speaker) => {
            return {name: speaker.name, shortname: speaker.shortname}
        })
    }

    async getListShort() {
        const data = await this.getData();
        return data.map((speaker) => {
            return {name: speaker.name, shortname: speaker.shortname, title: speaker.title}
        })        
    }

    async getList() {
        const data = await this.getData();
        return data.map((speaker) => {
            return {name: speaker.name, shortname: speaker.shortname, title: speaker.title, summary: speaker.summary}
        })        
    }

    async getAllArtwork() {
        const data = await this.getData();
        const artwork = data.reduce((acc, elm) => {
            if(elm.artwork){
                acc = [...acc, ...elm.artwork]
            }
            return acc;
        }, []);
        return artwork;
    }

    async getSpeaker(shortname){
        const data = await this.getData();
        const speaker = data.find((speaker) => {
            return speaker.shortname === shortname;
        })
        if(!speaker) return null;
        return { 
            title: speaker.title,
            name: speaker.name,
            shortname: speaker.shortname,
            description: speaker.description
        }
    }

    async getSpeakerArt(shortname){
        const data = await this.getData();
        const speaker = data.find((speaker) => {
            return speaker.shortname === shortname;
        })
        if(!speaker || !speaker.artwork) return null;
        return speaker.artwork
    }
}

module.exports = SpeakerService
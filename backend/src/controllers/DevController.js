const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket')

// O Controller geralmente tem 5 funções
// index, show, store, update, destroy

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) { //req'requisição' / res'resposta'
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            //esperar o 'await' responder para assim então ...continuar

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,   
                avatar_url,     
                bio,
                techs: techsArray,
                location,
            })

            //Filtrar as conexões que estão há no máx 10km de distancia 
            // e que o novo dev tenha pelo menos uma das tecnologias filtradas 
                 
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            csendMessage(sendSocketMessageTo, 'newDev', dev);
        }

    return response.json(dev);
}
}
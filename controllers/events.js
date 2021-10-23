const { response } = require('express');
const  Events = require('../models/Evento');

const getAllEvents = (req, resp = response) => {

    return resp.status(200).json({
        ok:true,
        msg: 'Todo encontrado'
    });

}


const ceateAnEvent = async(req, resp = response) => {

    const evento = new Events(req.body);
    
    try {
        evento.user = req.uid;
         const eventDB = await  evento.save();


        return resp.status(200).json({
             ok:true,
             msg:'Evento creado',
             eventDB
         })

    } catch (error) {
        console.error(error);
        return resp.status(500)
        .json({
            ok:false,
            msg:"Algo paso"
        })
    }


}


const updateAnEvent = (req, resp = response) => {

    const { id} = req.params;

    return resp.status(200).json({
        ok:true,
        msg: 'Todo encontrado',
        id
    });

}


const deleteAnEvent = (req, resp = response) => {

    const { id} = req.params;

    return resp.status(200).json({
        ok:true,
        msg: 'Todo encontrado',
        id
    });

}


module.exports = {
    
    getAllEvents,
    ceateAnEvent,
    updateAnEvent,
    deleteAnEvent
}


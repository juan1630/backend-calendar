const { response } = require('express');


const getAllEvents = (req, resp = response) => {

    return resp.status(200).json({
        ok:true,
        msg: 'Todo encontrado'
    });

}


const ceateAnEvent = (req, resp = response) => {

    return resp.status(200).json({
        ok:true,
        msg: 'Todo encontrado'
    });

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


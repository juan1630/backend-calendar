const { response } = require('express');
const  Events = require('../models/Evento');

const getAllEvents = async(req, resp = response) => {

    try {
        const events = await Events.find().populate("user", "name _id")
        
        return resp.status(200).json({
            ok:true,
            events
        });

    } catch (error) {
  
        return resp.status(500).json({
            ok:false,
            msg: 'No se pudo ver'
        });
    }

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


const updateAnEvent = async(req, resp = response) => {

    const { id} = req.params;
    const { uid } = req;

    try {
        
        //verificamos que el evento exista
        const evento = await Events.findById(id);
     
        if(!evento) {
            resp.status(404).json({
                ok:false,
                msg: 'El evento no existe'
            });
        }

        if(evento.user.toString() != uid) {
            return resp.status(401).json({
                ok:false,
                msg:'No tienes los permisos oara editar el evento'
            })
        }


        const nuewvoEvento = { 
            ...req.body,
            user: uid
        }

                            // sirve para retornar los eventos actualizados
        const eventoActualizado = await Events.findByIdAndUpdate(id, nuewvoEvento, { new: true });

        return resp.status(200).json({
            ok:true,
            msg: 'Todo encontrado',
            eventoActualizado
        });

    } catch (error) {
        console.error(error);

        resp.status(500).json({
            ok: false,
            msg: 'No se pudo actualizar'
        })
    }

}


const deleteAnEvent = async(req, resp = response) => {

    const { id} = req.params;
    const { uid } = req;

    try {
        
        const evento = await Events.findById(id);

        if(!evento) {
           return  resp.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            })
        }

        if(evento.user.toString() !=  uid  ){

            return resp.status(404).json({
                ok: false,
                msg: 'No puedes elimnar el evento'
            });
        }
        

        const eventoEliminar = await Events.findByIdAndDelete( id );

        return resp.status(200).json({
            ok:true,
            msg: 'Evento eliminado',
            eventoEliminar
        });

    } catch (error) {
        console.error(error);
        
        return resp.status(404).json({
            ok: false,
            msg: 'Algo paso'
        });  
    }



}


module.exports = {
    
    getAllEvents,
    ceateAnEvent,
    updateAnEvent,
    deleteAnEvent
}


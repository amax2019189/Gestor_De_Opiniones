import { response, request, json } from "express";
import bcryptjs from 'bcryptjs';
import Publications from './publications.model.js';

export const getPublicationsById = async (req, res) => {
    const {id} = req.params;
    const publications = await Publications.findOne({_id: id});

    res.status(200).json({
        publications
    })
}

export const publicationsPost = async (req, res) => {

    const {title, category, text} = req.body;
    const publications = new Publications( {title, category, text} );

    await publications.save();

    res.status(200).json({
        publications
    });
}

export const publicationsPut = async (req, res) => {
    const { id } = req.params;
    const {_id, ...resto} = req.body;
    
    await Publications.findByIdAndUpdate(id, resto);
    const publications = await Publications.findOne({_id: id});

    res.status(200).json({
        msg: 'Update Publications',
        publications
    });
}
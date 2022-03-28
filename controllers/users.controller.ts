import { Request, Response } from "express";
import User from "../models/user.model";

/** Obtiene todo los usuarios */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "ha ocurrido un error en el servidor, intente mas tarde" })
    }
};

/** Obtiene solo un usuario */
export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id)
        if (user) {
            res.json({ user })
        } else {
            res.status(404).json({ msg: "verifique los datos ingresados" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "ha ocurrido un error en el servidor, intente mas tarde" })
    }

};

/** Guardar un nuevo usuario en base de datos */
export const postUser = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        console.log(body);
        
        /**Validacion mail existente */
        const existMail = await User.findOne({ where: { mail: body.mail } });
        if (existMail) {
            return res.status(400).json({
                msg: `El correo ${body.mail} ya esta en uso.`
            })
        }

        //const user = new User(body); !!TS no lo reconoce como valido a pesar de si funcionar.
        const user = new User();
        if ( !body.name || !body.mail) {
            res.status(400).json({ msg: "Existen campos indefinidos, verificar los datos enviados" })
        }
        user.setDataValue('name',body.name)
        user.setDataValue('mail',body.mail)
        await user.save();
        res.status(201).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Ha ocurrido un error en el servidor, intente mas tarde" })
    }
};

/** Actualiza/Modifica un usuario */
export const putUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        const { body } = req;

        /** Validacion si el correo ya esta en uso */
        const existMail = await User.findOne({ where: { mail: body.mail } });
        if (existMail) {
            return res.status(400).json({
                msg: `El correo ${body.mail} ya esta en uso.`
            })
        }
        /**Validacion si existe un usuario */
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(400).json({
                msg: `El usuario con el id ${id} no existe.`
            })
        }
        await user.update(body);
        res.status(201).json({ user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "ha ocurrido un error en el servidor, intente mas tarde" })
    }
};

/** Elimina un usuario / borrado logico */
export const deleteUser = async(req: Request, res: Response) => {

    const { id } = req.params;

    try {
        /**Validacion si existe un usuario */
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(400).json({
                msg: `El usuario con el id ${id} no existe.`
            })
        }

        //await user.destroy();
        await user.update({ state: false });
        res.status(202).json({ msg:"El usuario fue eliminado exitosamente"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "ha ocurrido un error en el servidor, intente mas tarde" })    
    }

};
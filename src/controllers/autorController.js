import mongoose from "mongoose";
import { autor } from "../models/autor.js";

class AutorController {

    static async listarAutores(req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch {
            res.status(500).json({ message: `${erro.message} - Falha na busca`});
        }
    };

    static async buscaAutorPorId(req, res) {
        try {
            const id = req.params.id
            const autorBuscado = await autor.findById(id);

            if(autorBuscado !== null) {
                res.status(200).send(autorBuscado);
            } else {
                res.status(404).send({ message: "Autor não localizado"});
            }
        
        } catch {
            
            if(erro instanceof mongoose.Error.CastError){
                res.status(400).send({message: "Dados fornecidos estão incorretos"})
            } else {
                res.status(500).send({message: "Erro interno de servidor"});
            }
            
        }
    };

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "Autor cadastrado com sucesso", autor: novoAutor });
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar autor`});
        }
    };

    static async atualizarAutor(req, res) {
        try {
            const id = req.params.id
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Autor atualizado com sucesso" });
        } catch {
            res.status(500).json({ message: `${erro.message} - Falha na atualização`});
        }
    };

    static async excluirAutor(req, res) {
        try {
            const id = req.params.id
            await autor.findByIdAndDelete(id);
            res.status(200).json({ message: "Autor excluído com sucesso" });
        } catch {
            res.status(500).json({ message: `${erro.message} - Falha na exclusão`});
        }
    };

};

export default AutorController;

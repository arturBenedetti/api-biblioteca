import mongoose from "mongoose";
import { autor, autorSchema } from "../models/autor.js";

class AutorController {

    static async listarAutores(req, res, next) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch(erro){
            next(erro);
        }
    };

    static async buscaAutorPorId(req, res, next) {
        try {
            const id = req.params.id
            const autorBuscado = await autor.findById(id);

            if(autorBuscado !== null) {
                res.status(200).send(autorBuscado);
            } else {
                res.status(404).send({ message: "Autor não localizado"});
            }
        } catch(erro) {
            next(erro);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "Autor cadastrado com sucesso", autor: novoAutor });
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try {
          const id = req.params.id;
          await autor.findByIdAndUpdate(id, {$set: req.body});
          res.status(200).send({message: "Autor atualizado com sucesso"});
        } catch (erro) {
          next(erro);
        }
    };

    static excluirAutor = async (req, res, next) => {
        try {
          const id = req.params.id;
          await autor.findByIdAndDelete(id);
          res.status(200).send({message: "Autor removido com sucesso"});
        } catch (erro) {
          next(erro);
        }
    };

};

export default AutorController;

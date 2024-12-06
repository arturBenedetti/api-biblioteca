import livro from "../models/livro.js";
import { autor } from "../models/autor.js";

class LivroController {

    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch {
            res.status(500).json({ message: `${erro.message} - Falha na busca`});
        }
    };

    static async buscaLivroPorId(req, res) {
        try {
            const id = req.params.id
            const livroBuscado = await livro.findById(id);

            if (livroBuscado != null){
                res.status(200).json(livroBuscado);
            } else {
                res.status(404).send({ message: "Livro não localizado"});
            }

        } catch {

            if(erro instanceof mongoose.Error.CastError){
                res.status(400).send({message: "Dados fornecidos estão incorretos"})
            } else {
                res.status(500).send({message: "Erro interno de servidor"});
            } 

        }
    };

    static async cadastrarLivro(req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "Livro cadastrado com sucesso", livro: livroCriado });
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar livro`});
        }
    };

    static async atualizarLivro(req, res) {
        try {
            const id = req.params.id
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Livro atualizado com sucesso" });
        } catch {
            res.status(500).json({ message: `${erro.message} - Falha na atualização`});
        }
    };

    static async excluirLivro(req, res) {
        try {
            const id = req.params.id
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro excluído com sucesso" });
        } catch {
            res.status(500).json({ message: `${erro.message} - Falha na exclusão`});
        }
    };

    static async buscarLivrosPorEditora(req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na busca`});
        }
    };

};

export default LivroController;

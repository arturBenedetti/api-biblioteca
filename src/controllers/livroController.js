import livro from "../models/livro.js";
import { autor } from "../models/autor.js";

class LivroController {

    static listarLivros = async (req, res, next) => {
        try {
            const livrosResultado = await livro.find()
                .populate("autor")
                .exec();
    
            res.status(200).json(livrosResultado);
        } catch (erro) {
            next(erro);
        }
    };

    static buscaLivroPorId = async (req, res, next) => {
        try {
            const id = req.params.id;    
            const livroResultado = await livro.findById(id)
                .populate("autor", "nome")
                .exec();
    
            res.status(200).send(livroResultado);
        } catch (erro) {
            next(erro);
        }
    };

    static cadastrarLivro = async (req, res, next) => {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "Livro cadastrado com sucesso", livro: livroCriado });
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Livro atualizado com sucesso"});
        } catch (erro) {
            next(erro);
        }
    };

    static excluirLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroResultado = await livro.findByIdAndDelete(id);
            console.log(livroResultado);
    
            if (livroResultado !== null) {
                res.status(200).send({message: "Livro removido com sucesso"});
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
        } catch (erro) {
          next(erro);
        }
    };

    static buscarLivrosPorEditora = async (req, res, next) => {
        try {
            const editora = req.query.editora;
            const livrosResultado = await livro.find({"editora": editora});
            res.status(200).send(livrosResultado);
        } catch (erro) {
            next(erro);
        }
    };

}
export default LivroController;

import path from 'path';
import url from  'url';
import { createImagem } from '../models/ImagemModel.js';

const __filename= url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function inserindoImagem (req,res){
    console.log('ImagemCotroller :: inserindoImagem');
    const {descricao} = req.body;
    const {imagem} = req.files;

    if(!descricao || !imagem){
        res.status(400).json({message: 'Imagem e Descrição são obrigatorios'});
    } else {
        const extensao = path.extname(imagem.name).toLocaleLowerCase();
        const extensoesPermitidas = ['.jpg','.png','.jpeg'];

        if(extensoesPermitidas.includes(extensao)){
            const nome_imagem = `${Date.now()}${extensao}`;

            try {
               const [status,resposta] = await createImagem(descricao, nome_imagem, imagem);
               res.status(status).json(resposta);
            } catch (error) {
                console.log(error);
                res.status(500).json('ImagemController :: ERRO');
            }

        } else {
            res.status(415).json({message:'Arquivo Invalido'});
        }
    }
}

export function downloadImagem(req, res){
    console.log('ImagemCotroller :: downloadImagem');

    const {nome_imagem} = req.params;
    const caminho = path.join(__dirname,'..','..','public', 'img',nome_imagem);

    res.sendFile(caminho, (erro) => {
        if(erro){
            console.log(erro);
            res.status(404).json({message:'Imagem não encontrada'})
        }
    }
    );

    console.log(caminho);
}
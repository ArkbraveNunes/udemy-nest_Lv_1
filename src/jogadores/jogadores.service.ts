import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { uuid } from 'uuidv4'

@Injectable()
export class JogadoresService {
    
    private jogadores: Jogador[] = []
    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
        this.logger.log(`criaJogadorDto: ${criaJogadorDto}`)

        const { email } = criaJogadorDto;
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

        return jogadorEncontrado ? await this.atualizar(jogadorEncontrado, criaJogadorDto) : await this.criar(criaJogadorDto)
    }

    async consultarTodosJogadores() : Promise<Jogador[]> {
        return await this.jogadores;
    }

    private criar(criaJogadorDto: CriarJogadorDto): void {
        const { nome, telefoneCelular, email } = criaJogadorDto

        const jogador: Jogador = {
            _id: uuid(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.teste.com.br/img.png'
        }
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador);
    }

    private atualizar(jogadorEncontrado : Jogador, criarJogadorDto : CriarJogadorDto): void {
        const { nome } = criarJogadorDto
        jogadorEncontrado.nome = nome
    }
}

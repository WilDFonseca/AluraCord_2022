import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyOTgxNiwiZXhwIjoxOTU4OTA1ODE2fQ.Wy6pgnSXA9OsqfJQj49Ur8zJRSncJNoRBWK7i-z8BsY';
const SUPABASE_URL ='https://pwcgqbuhhwrsziqrwxvb.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//Next cria a página automaticamente, gerenciamento de página do next.
/*mudar de página pode ser feito de vários jeitos:
1- window.location.href ='/chat'; [Jeito tradicional]
Recurso do Next para fazer roteamento:
import { useRouter } from 'next/router'; [é um Hook]
2- const roteamento = useRouter();
        roteamento.push('/chat');*/
//Next tem um arquivo que encapsula todas as páginas a serem carregadas (config globais) fica no link Next Custom `App`. 

function escutaMensagemEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
                adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}

export default function ChatPage() {
    /*      Ações do usuário:
        -Usuário digita no campo textarea;
        -Aperta o enter para enviar;
        -tem que adicionar o texto na listagem.

        Como dev tenho que criar:
        Criar campo textarea;
        usar onChange para receber texto do usuário que usa o useState (ter if pra caso seja enter pra limpar a variável)
        Lista de mensagens (useStates)
    */
        const roteamento = useRouter();
        const usuarioLogado = roteamento.query.username;
        //console.log('roteamento.query', roteamento.query);
        //console;log('usuarioLogado, usuarioLogado);
        const [mensagem, setMensagem] = React.useState('');
        const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

        React.useEffect(() =>{ //Se o dado vem de um servidor ou precisa demorar pra acontecer(async), ele não participa do fluxo padrão, é um efeito colateral e precisa do useEffect.
            //só está usando o useEffect na primeira vez que a página carrega.
            supabaseClient
                .from('mensagens') //nome da tabela no supabase
                .select('*')// * = tudo
                .order('id', {ascending:false})//método do supabase
                .then(({data}) => {
                    //console.log('Dados da consulta', data);
                    setListaDeMensagens(data);
                });

            const subscription = escutaMensagemEmTempoReal((novaMensagem) => {
                console.log('Nova mensagem', novaMensagem);
                //Quero reusar um valor de referencia (objeto/array) vc cai no caso  de:
                //Passar uma função para o setState 
                    setListaDeMensagens((valorAtualDaLista) => {
                        return [
                            novaMensagem,
                            ...valorAtualDaLista,
                        ]
                    });
            });
            return () => {
                subscription.unsubscribe();
            }
        },[]) ;
        

        function handleNovaMensagem(novaMensagem) { //handle novaMensagem > valor da mensagem que vai receber.
            //cada mensagem não vai ser só uma string, vai ser um objeto, pq tb tem timestamp e outros.
            //Objetos não podem ser React child, não pode só renderizar, tem que pegar e distribuir os valores.
            //Ou é um array de componente React ou um array de Strings.
            const mensagem ={
                //id: listaDeMensagens.leght + 1,
                //Nome travado que receberia do backend;
                de: usuarioLogado, //usuário que receberiamos do backend, mas está vindo do login no front.
                texto: novaMensagem,
            };
            //Chamada de um backend
            supabaseClient
                .from('mensagens')
                .insert([ //Tem que ser um objeto com os MESMOS CAMPOS que escreveu no supabase.
                    mensagem
                ])
                .then(({data}) => {
                    console.log('Criando mensagem', data);
                    //setListaDeMensagens([ //pode inverter ordem da lista (o que vem primeiro) de acordo com a ordem da ,
                    //    data[0],
                    //    ...listaDeMensagens,    
                    //]);
                });
            setMensagem('');
        }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://i0.wp.com/wallpapercave.com/wp/wp4306669.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.novasCores[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {/* <MessageList mensagens={[]} /> 
                    .forEach não retorna nada, ele executa alguma coisa.
                    Para retornar e mapear os input, usamos o .map*/}
                    
                    {/*desassociar o nome da variável com o que o componente tá recebendo.
                    nome a esquerda, valor a direita.*/}
                    <MessageList mensagens={listaDeMensagens} />
                    
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        //console.log(mensagemAtual)
                        return (
                            //pasar no key o próprio valor da string que é recebido para evitar erro no React.
                            // : Concatenar.
                            <li key={mensagemAtual.id}> 
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            //Arrow function: ()=> Não precisa de ficar declarando função toda hora.
                            onChange={(event)=>{
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event)=>{
                                if(event.key ==='Enter'){
                                    event.preventDefault(); //evitar o padrão de pular linha ao enviar.
                                    //console.log(event);
                                    //passa um array, pega todos itens que tem dentro da lista e espalha eles dentro da lista nova. Comando espalhar é ...
                                    //código para submeter o formulário; lógia de estado.
                                    /*setListaDeMensagens{[
                                        ...listaDeMensagens,
                                        mensagem
                                        ]};
                                    setMensagem('');*/
                                    handleNovaMensagem(mensagem);

                                }
                                
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        {/**CallBack (chamada de retorno; quando alguma coisa que vc chamou, terminou, ele retorna*/}
                        <ButtonSendSticker 
                            onStickerClick={(sticker) => {
                                handleNovaMensagem(':sticker: ' + sticker);
                            }}
                        />    
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading4'>
                    WillChat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}
//como cada função é isolada, tenho que passar o texto da mensagem como argumento via props
function MessageList(props) {
    //console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${mensagem.de}.png`} //tem $ pq já ta dentro de uma string; usar string: `crase`
                    />
                    <Text tag="strong">
                        {mensagem.de}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                </Box>
                {/*Uso de condicional no React:
                Modo Declaratvio (vc declara o que quer que retorne, descreve: se for assim, vai pra lá); if normal dá ordem, se isso, faz aquilo.
                if  mensagem de texto possui stickers: renderiza imagem, else texto*/}
                {mensagem.texto.startsWith(':sticker:') //Condicional, if
                 ?  ( //verifica condição
                     <Image src={mensagem.texto.replace(':sticker:', '')} /> //chamar imagem e retirar sticker do nome.
                    )
                    : ( //else
                    mensagem.texto
                )}
                {/* if mensagem de texto possui stickers:
                           mostra a imagem
                        else 
                           mensagem.texto */}
            </Text>
                )
            })}
            
        </Box>
    )
}
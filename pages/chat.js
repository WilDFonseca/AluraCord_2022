import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

//Next cria a página automaticamente, gerenciamento de página do next.
/*mudar de página pode ser feito de vários jeitos:
1- window.location.href ='/chat'; [Jeito tradicional]
Recurso do Next para fazer roteamento:
import { useRouter } from 'next/router'; [é um Hook]
2- const roteamento = useRouter();
        roteamento.push('/chat');*/
//Next tem um arquivo que encapsula todas as páginas a serem carregadas (config globais) fica no link Next Custom `App`. 

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

        const [mensagem, setMensagem] = React.useState('');
        const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

        function handleNovaMensagem(novaMensagem) { //handle novaMensagem > valor da mensagem que vai receber.
            //cada mensagem não vai ser só uma string, vai ser um objeto, pq tb tem timestamp e outros.
            //Objetos não podem ser React child, não pode só renderizar, tem que pegar e distribuir os valores.
            //Ou é um array de componente React ou um array de Strings.
            const mensagem ={
                id: listaDeMensagens.leght + 1,
                de: 'Wil', //Nome travado que receberia do backend.
                texto: novaMensagem,
            }
            //Chamada de um backend
            //pode inverter ordem da lista (o que vem primeiro) de acordo com a ordem da ,
            setListaDeMensagens{[
                mensagem,
                ...listaDeMensagens,
                
            ]};
            setMensagem('');
        }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
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
                    backgroundColor: appConfig.theme.colors.neutrals[700],
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
                <Text variant='heading5'>
                    Chat
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
    console.log('MessageList', props);
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
                        src={`https://github.com/vanessametonini.png`}
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
                {mensagem.texto}
            </Text>
                )
            })}
            
        </Box>
    )
}
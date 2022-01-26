export default function PaginaDoChar(){
    return(
        <div>Página do Chat</div>
    )
}
//Next cria a página automaticamente, gerenciamento de página do next.
/*mudar de página pode ser feito de vários jeitos:
1- window.location.href ='/chat'; [Jeito tradicional]
Recurso do Next para fazer roteamento:
import { useRouter } from 'next/router'; [é um Hook]
2- const roteamento = useRouter();
        roteamento.push('/chat');*/
//Next tem um arquivo que encapsula todas as páginas a serem carregadas (config globais) fica no link Next Custom `App`. 

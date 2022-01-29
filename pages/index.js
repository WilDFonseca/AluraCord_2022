import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
//Yarn Start: Yarn dev
//função (argumento1, 2...)
//${} Valor dinanmico
//Ctrl/ Comentar código {/* XYZ */}
//import {todos componentes que vou usar}
//Chamar variável: {}
//MAIS IMPORTANTE DO REACT: useState (pode iniciar variável vazia) [Receber o valor que vou consegui ver e quem eu devo avisar quando precisar mudar isso]
//const [Array *username*(variável), *setUsername*(função)] = React.useState(Variável, função)
/*Exemplo:  onde tá o valor?
            const valor = event.target.value;
            Trocar o valor da variável através do React
            setUsername(valor);
//padrão do form é recarregar a página, usar prevent.default para não deixar recarregar.


//Componente React
/*function Title(props){
    const Tag = props.tag;
    return (
        <Tag>{props.children}</Tag>

    )
}
*/

// || ou
function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
      <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['700']};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
      </>
    );
  }

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
    //const username = 'WILDNEY';
    const [username, setUsername] = React.useState('WilDfonseca');
    const roteamento = useRouter();

    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[300],
            backgroundImage: 'url(https://i0.wp.com/wallpapercave.com/wp/wp4306669.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.novasCores[300],
              opacity: 0.9,
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (infosDoEvento) {
                infosDoEvento.preventDefault();
                console.log('Alguém submeteu o form');
                roteamento.push(`/chat?username=${username}`);//também pode ser feito: ('/chat?username=' + username): 
                // window.location.href = '/chat';
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Welcome back, Rider!</Titulo>
              <Text variant="h2" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[600] }}>
                {appConfig.name}
              </Text>
              Seu Github aqui:
              {/*onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              console.log('Alguém submeteu o form');
              roteamento.push('/chat');
              // window.location.href = '/chat';
            }}*/}
              <TextField
                 value={username}
                 onChange={function (event) {
                   console.log('usuario digitou', event.target.value);
                   // Onde ta o valor?
                   const valor = event.target.value;
                   // Trocar o valor da variavel
                   // através do React e avise quem precisa
                   setUsername(valor);
                 }}
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[500],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.novasCores[400],
                    backgroundColor: appConfig.theme.colors.novasCores[100],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.novasCores[500],
                  mainColorLight: appConfig.theme.colors.novasCores[100],
                  mainColorStrong: appConfig.theme.colors.novasCores[400],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.novasCores[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[500],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }


async function encriptar(){
   const texto =  document.getElementById('text').value;
   document.getElementById('text').value = ''
   console.log(texto.replace('\n', '|'))

    if(texto) {
        fetch('https://livelo-mock.getsandbox.com/v2/test/api?text=' + texto.replace('\n', '|'))
        .then((response) => { 
            response.text().then((x) => document.getElementById('resposta').value = x);
        });
    } else {
        alert('Coloca um texte seu animal');
    }
   
}

async function decriptar(){
   const texto =  document.getElementById('resposta').value;
   document.getElementById('resposta').value = ''
   console.log(texto.replace('\n', '|'))

    if(texto) {
        fetch('https://livelo-mock.getsandbox.com/v3/test/api?text=' + texto.replace('\n', '|'))
    .then((response) => { 
        response.text().then((x) => document.getElementById('text').value = x);
    });
    } else {
        alert('Coloca um texte seu animal');
    }
}
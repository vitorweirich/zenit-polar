function encode(str){
    
    const zenit = ['a', 'o', 'd', 'm', 't'];
    const polar = ['z', 'l', 'i', 'u', 'v'];
    let encoded = '';
    
    const hasUpper = (str) => /[A-Z]/.test(str);
        
    for(let h = 0; h < str.length; h++) {
        for(let z = 0; z < 5; z++) {
            if(str[h].toLowerCase() === zenit[z].toLowerCase()) {
                encoded += hasUpper(str[h]) ? polar[z].toUpperCase() : polar[z];
                break;
            } else if(str[h].toLowerCase() === polar[z].toLowerCase()) {
                encoded += hasUpper(str[h]) ? zenit[z].toUpperCase() : zenit[z];
                break;
            } else if(z === 4) {
                encoded += str[h];
            }
        }
    }
    
    return encoded;
}

function traduzir(query) {
    const text = query;
    let frases = String(text).split('|');
    
    const vogais = ['a', 'e', 'i', 'o', 'u', '0', '1', '2' , '3', '4', '5', '6' , '7', '8', '9'];
    
    const x = [];
    for(let i = 0; i < frases.length; i++) {
 	    const palavras = frases[i].split(' ').map((p) => p.replace('caetano', ':burro:')); 
        let j = 0;
        let str = "";
        while(j < palavras.length) {
            if(palavras.length - j < 2) {
                str = str + "" + palavras[j];
                break;
        	}
        	if(!vogais.includes(palavras[j][0].toLowerCase()) && !vogais.includes(palavras[j+1][0].toLowerCase())) {
        	    str+= (palavras[j+1][0] + palavras[j].substr(1) + " " + palavras[j][0] + palavras[j+1].substr(1) + " ");
                j+=2;
            } else {
          	    str+= palavras[j] + " ";
          	    j+=1;
            }
        }
        let encoded = encode(str);
        x.push(encoded.trim());
    }
    
    return x.join('|');
}

function desTraduzir(query){
    const text = query;
    let frases = String(text).split('|');
    
    const vogais = ['a', 'e', 'i', 'o', 'u', '0', '1', '2' , '3', '4', '5', '6' , '7', '8', '9'];
    
    const x = [];
    for(let i = 0; i < frases.length; i++) {
 	    const palavras = frases[i].split(' ').map((p) => encode(p.replace('caetano', ':burro:'))); 
        let j = 0;
        let str = "";
        while(j < palavras.length) {
            if(palavras.length - j < 2) {
                str = str + "" + palavras[j];
                break;
        	}
        	if(!vogais.includes(palavras[j][0].toLowerCase()) && !vogais.includes(palavras[j+1][0].toLowerCase())) {
        	    str+= (palavras[j+1][0] + palavras[j].substr(1) + " " + palavras[j][0] + palavras[j+1].substr(1) + " ");
                j+=2;
            } else {
          	    str+= palavras[j] + " ";
          	    j+=1;
            }
        }
        x.push(str.trim());
    }
    
    return x.join('\n');
}

async function encriptar(){
   const texto =  document.getElementById('text').value;
   document.getElementById('text').value = ''

    if(texto) {
        document.getElementById('resposta').value = traduzir(texto.replace('\n', '|'));
    } else {
        alert('Coloca um texte seu animal');
    }
   
}

async function decriptar(){
   const texto =  document.getElementById('resposta').value;
   document.getElementById('resposta').value = ''

    if(texto) {
        document.getElementById('text').value = desTraduzir(texto);
    } else {
        alert('Coloca um texte seu animal');
    }
}
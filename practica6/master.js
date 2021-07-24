import fs, { readFileSync } from 'fs'


const getText = (text) => {
    const data = readFileSync(text, 'utf-8')
    const miObjeto = JSON.parse(JSON.stringify(data))
   
    console.log(miObjeto)
}
getText('text.txt')
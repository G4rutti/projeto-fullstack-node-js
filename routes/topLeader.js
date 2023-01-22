const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const {join} = require('path')


let SaveLeader = (users, arquivo) => {
    fs.writeFileSync(arquivo,JSON.stringify(users,null,'\t'))
}

let  getLeader = (arquivo) => {
    const data = fs.existsSync(arquivo)
        ?fs.readFileSync(arquivo)
        :[]

    try {
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}


const fetchData = async(url) => {
    const result = await axios.get(url)
    return result.data
}

const main = async (liga, arquivo) => {
    const content = await fetchData(`${liga}`)
    const $ = cheerio.load(content)
    let artilheiros = []

    $('div#yw1 table.items tbody tr').each((i, e) => {
        const AllElements = $(e).find('td')
        const posicaoRanking = $(AllElements[0]).text()
        const imagemArtilheiro = $(AllElements[2]).find('img').attr('data-src')
        const nomeArtilheiro = $(AllElements[1]).find('table > tbody > tr > td.hauptlink > a').text()
        const nacionalidade = $(AllElements[5]).find('img').attr('title')
        const idade = $(AllElements[6]).text()
        const clube = $(AllElements[7]).find('a').attr('title')
        const imagemClube = $(AllElements[7]).find('a > img').attr('src')
        const jogos = $(AllElements[8]).find('a').text()
        const gols = $(AllElements[9]).find('a').text()
        

        if(nomeArtilheiro != ""){
            const data = {posicaoRanking, imagemArtilheiro, nomeArtilheiro, nacionalidade, idade, clube, imagemClube, jogos, gols}
            artilheiros.push(data)
        }
        SaveLeader(artilheiros, arquivo)
    })
}


const userRoute = (app) =>{
    app.get('/pl',(req, res) => {
        try {
            const filePath = join(__dirname, 'topLeadersPL.json')
            const leaders = getLeader(filePath)
            main("https://www.transfermarkt.com.br/premier-league/torschuetzenliste/wettbewerb/GB1/saison_id/2022", filePath)
            res.send({leaders})
            return 
        } catch (error) {
            res.status(500).json({error : error})
        }
    fs.unlink("topLeadersPL.json")
    })

    app.get('/laliga',(req, res) => {
        try {
            const filePath = join(__dirname, 'topLeadersLaLiga.json')
            const leaders = getLeader(filePath)
            main("https://www.transfermarkt.com.br/laliga/torschuetzenliste/wettbewerb/ES1/saison_id/2022", filePath)
            res.send({leaders})
            return 

        } catch (error) {
            res.status(500).json({error : error})
        }
    fs.unlink("topLeadersLaLiga.json")
    })
}

module.exports = userRoute

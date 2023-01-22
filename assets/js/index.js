const fetchApi=  async(liga) => {
    const APIResponse = await fetch(`http://localhost:3000/${liga}`)
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderTopLeaders = async() => {
    const data = await fetchApi(document.getElementById('liga').value)
    document.getElementById('table').innerHTML = ""
    for(let i = 0; i < parseInt(document.getElementById("mostrarQuantos").value); i++){
        document.getElementById('table').innerHTML += `
        <th>${data['leaders'][i]['posicaoRanking']}</th>
        <td>${data['leaders'][i]['nomeArtilheiro']}</td>
        <td>${data['leaders'][i]['nacionalidade']}</td>
        <td>${data['leaders'][i]['idade']}</td>
        <td>${data['leaders'][i]['clube']}</td>
        <td>${data['leaders'][i]['jogos']}</td>
        <td>${data['leaders'][i]['gols']}</td>
        `
    }
}


const fetchPl =  async() => {
    const APIResponse = await fetch(`http://localhost:3000/pl`)
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderTopLeaders = async() => {
    const data = await fetchPl()
    console.log(data['leaders'])
}

renderTopLeaders()
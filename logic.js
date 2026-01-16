let paroquias = []


const container = document.getElementById('parishContainer');
const selectBairro = document.getElementById('filterBairro');

async function carregarDados() {
    try {
        const resposta = await fetch('database.json');
        paroquias = await resposta.json();
        console.log("Dados carregados com sucesso:", paroquias);

        // ORDEM IMPORTANTE:
        popularBairros(); // Primeiro cria as opções de bairro
        render();         // Depois mostra as paróquias na tela
    } catch (erro) {
        console.error("Erro ao carregar os dados:", erro);
    }
}

function popularBairros() {
    const selectBairro = document.getElementById('filterBairro');
    // Limpa o select antes de popular (caso já tenha algo)
    selectBairro.innerHTML = '<option value="">Todos os Bairros</option>';

    const bairrosUnicos = [...new Set(paroquias.map(p => p.bairro))].sort();

    bairrosUnicos.forEach(bairro => {
        const option = document.createElement('option');
        option.value = bairro;
        option.textContent = bairro;
        selectBairro.appendChild(option);
    });
}

function render() {
    const nomeVal = document.getElementById('filterNome').value.toLowerCase();
    const bairroVal = document.getElementById('filterBairro').value;
    const missaVal = document.getElementById('filterMissa').value.toLowerCase();
    const confVal = document.getElementById('filterConfissao').value.toLowerCase();
    const diaConf = document.getElementById('filterDateConfissao').value.toLowerCase();

    // Captura o novo filtro de dia de missa
    const diaMissa = document.getElementById('filterDateMissa').value.toLowerCase();

    container.innerHTML = "";

    const filtradas = paroquias.filter(p => {
        const matchNome = p.nome.toLowerCase().includes(nomeVal);
        const matchBairro = bairroVal === "" || p.bairro === bairroVal;

        // Filtro por texto no horário da missa (ex: "19h")
        const matchMissa = missaVal === "" || p.missas.some(h => h.toLowerCase().includes(missaVal));

        // NOVO: Filtro por dia da semana da missa
        const matchDateMissa = diaMissa === "" || p.missas.some(h => h.toLowerCase().includes(diaMissa));

        const matchConf = confVal === "" || p.confissoes.some(h => h.toLowerCase().includes(confVal));
        const matchDateConf = diaConf === "" || p.confissoes.some(h => h.toLowerCase().includes(diaConf));

        // Retorna verdadeiro apenas se passar em TODOS os filtros ativos
        return matchNome && matchBairro && matchMissa && matchDateMissa && matchConf && matchDateConf;
    });

    // Renderização dos cards (o código permanece o mesmo abaixo)
    filtradas.forEach(p => {
        const missasFormatadas = p.missas.map(horario => `• ${horario}`).join('<br>');
        const confissoesFormatadas = p.confissoes.map(horario => `• ${horario}`).join('<br>');

        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <h2>${p.nome}</h2>
            <div class="info-box">
                <span class="section-title">📍 Bairro</span>
                <p class="detalhe">${p.bairro}</p>
            </div>
            <div class="info-box">
                <span class="section-title">⛪ Horários de Missas</span>
                <div class="horarios-list">${missasFormatadas}</div>
            </div>
            <div class="info-box">
                <span class="section-title">🙏 Confissões</span>
                <div class="horarios-list">${confissoesFormatadas}</div>
            </div>
        `;
        container.appendChild(div);
    });
}

document.querySelectorAll('.filter-group input, .filter-group select').forEach(el => {
    el.addEventListener('input', render);
});

carregarDados();
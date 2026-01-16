let paroquias = []


const container = document.getElementById('parishContainer');
const selectBairro = document.getElementById('filterBairro');

const btnToggle = document.getElementById('btnToggleFilters');
const filterGroup = document.getElementById('filterGroup');


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
    const diaMissa = document.getElementById('filterDateMissa').value.toLowerCase();

    container.innerHTML = "";

    const filtradas = paroquias.filter(p => {
        const matchNome = p.nome.toLowerCase().includes(nomeVal);
        const matchBairro = bairroVal === "" || p.bairro === bairroVal;
        const matchMissa = missaVal === "" || p.missas.some(h => h.toLowerCase().includes(missaVal));
        const matchDateMissa = diaMissa === "" || p.missas.some(h => h.toLowerCase().includes(diaMissa));
        const matchConf = confVal === "" || p.confissoes.some(h => h.toLowerCase().includes(confVal));
        const matchDateConf = diaConf === "" || p.confissoes.some(h => h.toLowerCase().includes(diaConf));

        return matchNome && matchBairro && matchMissa && matchDateMissa && matchConf && matchDateConf;
    });

    filtradas.forEach(p => {
        const missasFormatadas = p.missas.map(horario => `• ${horario}`).join('<br>');
        const confissoesFormatadas = p.confissoes.map(horario => `• ${horario}`).join('<br>');

        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
        <h2>${p.nome}</h2>
        
        <div class="info-box">
            <span class="section-title">📍 Endereço e Bairro</span>
            <p class="detalhe">${p.endereco ? p.endereco + ' - ' : ''}${p.bairro}</p>
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

btnToggle.addEventListener('click', () => {
    filterGroup.classList.toggle('active');

    // Opcional: Mudar o texto do botão quando aberto
    if (filterGroup.classList.contains('active')) {
        btnToggle.textContent = "🔼 Fechar Filtros";
    } else {
        btnToggle.textContent = "🔍 Filtrar Horários";
    }
});

carregarDados();
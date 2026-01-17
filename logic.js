let paroquias = [];

const container = document.getElementById('parishContainer');
const selectBairro = document.getElementById('filterBairro');
const btnToggle = document.getElementById('btnToggleFilters');
const filterGroup = document.getElementById('filterGroup');

// Template para informações ausentes
const MSG_AUSENTE = `<span class="info-missing">Informação ainda não contemplada. Caso queira contribuir, entre em contato: <a href="mailto:pedrogcorrea3@gmail.com">pedrogcorrea3@gmail.com</a></span>`;


async function carregarDados() {
    try {
        const resposta = await fetch('database.json');
        paroquias = await resposta.json();
        console.log("Dados carregados com sucesso:", paroquias);

        popularBairros();
        render();
    } catch (erro) {
        console.error("Erro ao carregar os dados:", erro);
    }
}

function popularBairros() {
    const selectBairro = document.getElementById('filterBairro');
    selectBairro.innerHTML = '<option value="">Todos os Bairros</option>';

    // Filtra bairros que não estão vazios para não criar opção em branco no select
    const bairrosUnicos = [...new Set(paroquias.map(p => p.bairro).filter(b => b !== ""))].sort();

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
        // Lógica para formatar listas ou exibir o template
        const missasFormatadas = p.missas.length > 0
            ? p.missas.map(horario => `• ${horario}`).join('<br>')
            : MSG_AUSENTE;

        const confissoesFormatadas = p.confissoes.length > 0
            ? p.confissoes.map(horario => `• ${horario}`).join('<br>')
            : MSG_AUSENTE;

        // Lógica para endereço e bairro
        let localizacao = "";
        if (!p.endereco && !p.bairro) {
            localizacao = MSG_AUSENTE;
        } else {
            localizacao = `${p.endereco ? p.endereco : ''}${p.endereco && p.bairro ? ' - ' : ''}${p.bairro}`;
        }

        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
        <h2>${p.nome}</h2>
        
        <div class="info-box">
            <span class="section-title">📍 Endereço e Bairro</span>
            <p class="detalhe">${localizacao}</p>
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
    if (filterGroup.classList.contains('active')) {
        btnToggle.textContent = "🔼 Fechar Filtros";
    } else {
        btnToggle.textContent = "🔍 Filtrar Horários";
    }
});

carregarDados();
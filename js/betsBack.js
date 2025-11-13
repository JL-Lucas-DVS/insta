const betsBackData = {
    "contestCount": 8,
    "analysis": {
        "betsBackAnalysis": [
            { "category": "Bets Back A", "occurrences": 0, "lastContest": 0, "percentage": "0%" },
            { "category": "Bets Back B", "occurrences": 0, "lastContest": 0, "percentage": "0%" },
            { "category": "Bets Back C", "occurrences": 2, "lastContest": 2899, "percentage": "40%" },
            { "category": "Bets Back D", "occurrences": 1, "lastContest": 2895, "percentage": "20%" },
            { "category": "Bets Back E", "occurrences": 1, "lastContest": 2897, "percentage": "20%" },
            { "category": "Bets Back F", "occurrences": 1, "lastContest": 2898, "percentage": "20%" }
        ]
    }
};


function setContestAnalysis(count) {
    const contestElement = document.getElementById('contest-analysis');
    if (contestElement) {
        contestElement.textContent = `Análise dos últimos ${count} concursos`;
    }
}

function createBetsBackAnalysisTable(betsBackAnalysisData) {
    const tableBody = document.getElementById('betsback-analysis-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';

    betsBackAnalysisData.forEach(item => {
        const row = document.createElement('tr');

        const categoryCell = document.createElement('td');
        categoryCell.textContent = item.category;
        row.appendChild(categoryCell);

        const occurrencesCell = document.createElement('td');
        occurrencesCell.textContent = item.occurrences;
        row.appendChild(occurrencesCell);

        const lastContestCell = document.createElement('td');
        lastContestCell.textContent = item.lastContest;
        row.appendChild(lastContestCell);

        const percentageCell = document.createElement('td');
        percentageCell.textContent = item.percentage;
        row.appendChild(percentageCell);

        tableBody.appendChild(row);
    });

    function findPredominantCategory(betsBackAnalysisData) {
        return betsBackAnalysisData.reduce((max, item) => {
            const currentPercentage = parseFloat(item.percentage);
            return currentPercentage > max.percentage ? { category: item.category, percentage: currentPercentage } : max;
        }, { category: '', percentage: 0 }).category;
    }

    // Define a categoria predominante para a frase
    const predominantCategory = findPredominantCategory(betsBackData.analysis.betsBackAnalysis);
    const rangeElement = document.getElementById('betsback-range');
    if (rangeElement) {
        rangeElement.textContent = predominantCategory;
    }
}

// Função para atualizar a imagem com os dados do formulário
function atualizarImagem() {
    const concurso = document.getElementById('concursoInput').value || '3535';
    const data = document.getElementById('dataInput').value || '11/05/2025';
    const numerosTexto = document.getElementById('numerosInput').value || '';
    
    // Processar os números: remover espaços e dividir por vírgula
    const numeros = numerosTexto
        .split(',')
        .map(n => n.trim())
        .filter(n => n !== '')
        .slice(0, 15); // Limitar a 15 números
    
    // Atualizar exibição do concurso
    document.getElementById('concursoDisplay').textContent = `CONCURSO ${concurso}`;
    
    // Atualizar exibição da data
    document.getElementById('dataDisplay').textContent = `DATA ${data}`;
    
    // Atualizar a grade de números
    const numerosGrid = document.getElementById('numerosDisplay');
    numerosGrid.innerHTML = '';
    
    numeros.forEach(numero => {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'number';
        numberDiv.textContent = numero.padStart(2, '0'); // Adiciona 0 à esquerda se necessário
        numerosGrid.appendChild(numberDiv);
    });
    
    // Mostrar a seção da imagem
    document.getElementById('imageSection').style.display = 'block';
    
    // Scroll para a imagem
    document.getElementById('imageSection').scrollIntoView({ behavior: 'smooth' });
}

// Inicializa os dados da página
setContestAnalysis(betsBackData.contestCount);
createBetsBackAnalysisTable(betsBackData.analysis.betsBackAnalysis);

// Função para copiar a legenda
function copiarLegenda(botao) {
    const concurso = document.getElementById('concursoInput').value || '3535';
    const data = document.getElementById('dataInput').value || '11/05/2025';
    
    const legenda = `🍀 Resultado da Lotofácil — Concurso ${concurso} (${data})

Confira as dezenas sorteadas e compare com suas análises no DasLoto.

📊 Descubra padrões, repetições e tendências diretamente no app.

#DasLoto #Lotofacil #Resultados #Loterias #Estatísticas #Simulações #JogosInteligentes`;

    // Copiar para o clipboard
    navigator.clipboard.writeText(legenda).then(() => {
        // Feedback visual
        const textoOriginal = botao.textContent;
        botao.textContent = '✓ Copiado!';
        botao.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            botao.textContent = textoOriginal;
            botao.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
        alert('Erro ao copiar a legenda!');
    });
}


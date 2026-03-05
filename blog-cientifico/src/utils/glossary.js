export const glossaryData = {
  "Nebulosa": "Uma vasta nuvem de poeira e gás no espaço interestelar, muitas vezes o berçário onde novas estrelas nascem.",
  "Supernova": "A explosão final e catastrófica de uma estrela massiva, brilhando mais que uma galáxia inteira por um curto período.",
  "Buraco Negro": "Uma região do espaço onde a gravidade é tão forte que nada, nem mesmo a luz, pode escapar dela.",
  "Parsec": "Uma unidade de distância astronômica equivalente a cerca de 3,26 anos-luz.",
  "Ano-luz": "A distância que a luz percorre no vácuo em um ano, aproximadamente 9,46 trilhões de quilômetros.",
  "Galáxia": "Um enorme sistema de estrelas, gás, poeira e matéria escura mantidos juntos pela gravidade.",
  "Exoplaneta": "Um planeta que orbita uma estrela fora do nosso Sistema Solar.",
  "Matéria Escura": "Uma forma invisível de matéria que não emite luz, mas exerce influência gravitacional significativa no universo.",
  "Pulsar": "Uma estrela de nêutrons altamente densa e em rápida rotação que emite feixes de radiação eletromagnética.",
  "Quasar": "O núcleo extremamente brilhante e ativo de uma galáxia distante, alimentado por um buraco negro supermassivo.",
  "Evento de Horizonte": "A 'fronteira' ao redor de um buraco negro da qual nada pode retornar.",
  "Via Láctea": "A galáxia espiral que contém o nosso Sistema Solar.",
  "M33": "Também conhecida como Galáxia do Triângulo, é uma das galáxias mais próximas da nossa.",
  "Curiosity": "Um robô astromóvel da NASA que explora a cratera Gale em Marte desde 2012.",
  "Perseverance": "O robô mais avançado da NASA em Marte, buscando sinais de vida antiga na cratera Jezero."
};

/**
 * Função para processar texto e identificar termos do glossário.
 * Retorna um array de partes (texto comum ou objeto do termo)
 */
export function processGlossaryText(text) {
  if (!text) return [];
  
  // Criar regex com todos os termos, ignorando maiúsculas/minúsculas
  const terms = Object.keys(glossaryData);
  const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
  
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    // Adicionar texto antes do match
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
    }
    
    // Identificar o termo original do banco (case insensitive match)
    const matchedTerm = match[0];
    const originalTerm = terms.find(t => t.toLowerCase() === matchedTerm.toLowerCase());
    
    parts.push({ 
      type: 'term', 
      content: matchedTerm,
      definition: glossaryData[originalTerm]
    });
    
    lastIndex = regex.lastIndex;
  }
  
  // Adicionar o restante do texto
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) });
  }
  
  return parts;
}

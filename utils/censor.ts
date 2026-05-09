/**
 * censorMessage — censura palavrões em PT-BR e EN
 * Substitui o miolo da palavra por asteriscos, mantendo
 * a primeira e a última letra: "merda" → "m***a"
 */

const PROFANITY_LIST = [
    // PT-BR
    'merda','porra','caralho','puta','viado','buceta','cu','cuzao','cuzão',
    'fdp','filhodaputa','filho da puta','vai se foder','foder','foda','fodase',
    'foda-se','arrombado','arrombada','babaca','idiota','imbecil','otario',
    'otário','otaria','corno','corna','desgraça','desgraca','desgraçado',
    'vsf','vtnc','vagabundo','vagabunda','prostituta','piranha','safado',
    'safada','lixo','burro','burra','retardado','retardada','mongolóide',
    'mongol','palhaço','palhaco','vigarista','canalha','lazarento',
    'maldito','maldita','inferno','diabo','satanas','satanás',
    // EN
    'fuck','shit','asshole','bitch','cunt','dick','cock','pussy','bastard',
    'motherfucker','nigger','faggot','whore','slut','damn','hell','crap',
    'ass','piss','bollocks','wanker','twat',
];

// Ordena por tamanho decrescente para evitar substituições parciais erradas
const SORTED = [...PROFANITY_LIST].sort((a, b) => b.length - a.length);

function censorWord(word: string): string {
    if (word.length <= 2) return word;
    if (word.length === 3) return word[0] + '*' + word[word.length - 1];
    const middle = '*'.repeat(word.length - 2);
    return word[0] + middle + word[word.length - 1];
}

export function censorMessage(text: string): string {
    let result = text;

    for (const profanity of SORTED) {
        // Escapa caracteres especiais para regex
        const escaped = profanity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?<![a-zA-ZÀ-ú])${escaped}(?![a-zA-ZÀ-ú])`, 'gi');

        result = result.replace(regex, (match) => censorWord(match));
    }

    return result;
}

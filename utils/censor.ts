/**
 * censorMessage — Filtro de palavrões PT-BR + EN
 *
 * Correções desta versão:
 *  ✅ Letras repetidas: "caralhoooooo" → censurado
 *  ✅ Frases completas: "filho da puta" → "f***********a" (não só "puta")
 *  ✅ Leet speak: c4r4lho, f0d4, m3rd4, v14d0
 *  ✅ Separadores: c.a.r.a.l.h.o | c a r a l h o | c-a-r-a-l-h-o
 *
 * ~160 raízes × leet × repetição × separadores = 1200+ padrões.
 */

// ─── Helpers ──────────────────────────────────────────────────────────────────

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Censura mantendo primeira e última letra.
 * "caralho" → "c*****o" | "filho da puta" → "f***********a"
 */
function censorWord(match: string): string {
    const w = match.trim();
    if (w.length <= 2) return w;
    if (w.length === 3) return w[0] + '*' + w[w.length - 1];
    return w[0] + '*'.repeat(w.length - 2) + w[w.length - 1];
}

// ─── Mapa leet: cada letra aceita ela mesma + equivalentes + repetição (+) ───

const CHAR_LEET: Record<string, string> = {
    a: '[a4@]+', e: '[e3]+', i: '[i1!]+', o: '[o0]+',
    s: '[s5$]+', t: '[t7]+', u: 'u+',    c: '[cç]+',
    // demais letras: a letra + repetição
    b:'b+',d:'d+',f:'f+',g:'g+',h:'h+',j:'j+',k:'k+',
    l:'l+',m:'m+',n:'n+',p:'p+',q:'q+',r:'r+',v:'v+',
    w:'w+',x:'x+',y:'y+',z:'z+',
};

/** Separadores opcionais entre cada caractere */
const SEP = '[\\s.\\-_*]*';

/**
 * Converte uma palavra/frase base em regex tolerante a:
 *  - leet speak (c4r4lho)
 *  - letras repetidas (caralhoooooo)
 *  - separadores entre letras (c.a.r.a.l.h.o)
 *  - espaços extras entre palavras de uma frase
 */
function wordToRegex(word: string): RegExp {
    const pattern = word
        .toLowerCase()
        .split('')
        .map(ch => {
            if (ch === ' ') return '\\s+';                      // espaço dentro de frase
            return CHAR_LEET[ch] ?? (escapeRegex(ch) + '+');   // letra com leet+repetição
        })
        .join(SEP);

    return new RegExp(`(?<![a-zA-ZÀ-ú0-9])${pattern}(?![a-zA-ZÀ-ú0-9])`, 'gi');
}

// ─── Base de palavrões pesados PT-BR ─────────────────────────────────────────

const BASE_PTBR: string[] = [

    // Frases completas (listadas aqui para garantir ordenação certa)
    'filho da puta', 'filha da puta', 'filhodaputa', 'filhadaputa',
    'puta que pariu', 'puta merda',
    'vai se foder', 'vai pra puta que te pariu',
    'vai tomar no cu', 'vai tomar no rabo',
    'toma no cu', 'toma no rabo',
    'vai a merda', 'vai pra merda',
    'me chupa', 'me come',
    'vou te matar', 'vou te bater', 'vou te estuprar', 'vou te machucar',
    'comi tua mae', 'fui na sua mae', 'a mae que te pariu',
    'sua mae', 'dar o cu', 'dar a bunda',
    'sentar na rola', 'senta na rola',

    // Genitália masculina
    'pica', 'picao', 'picinha', 'pixa', 'pixao',
    'rola', 'rolinha', 'rolao',
    'pau', 'pauzao', 'pauzinho',
    'pinto', 'pintinho', 'pintao',
    'saco', 'sacola', 'saquinho',
    'penis', 'testiculo', 'testiculao',

    // Genitália feminina
    'buceta', 'bct', 'bucetinha', 'bucetona',
    'xoxota', 'xoxotinha', 'xoxotona',
    'xereca', 'xerecar', 'xerecona',
    'vagina', 'clitoris', 'clit',

    // Anal / traseiro
    'cu', 'cuzinho', 'cuzao', 'cuzuda', 'cuzudo',
    'bunda', 'bundao', 'bundinha', 'bunduda', 'bundudo',
    'rabo', 'rabao', 'anus',

    // Palavrões base
    'porra', 'porrada', 'porrinha', 'porrao',
    'caralho', 'caraio', 'caraia',
    'merda', 'merdinha', 'merdoso', 'merdao', 'merdona',
    'foda-se', 'fodase',

    // Foder e variantes
    'foder', 'foda', 'fodendo', 'fodido', 'fodida', 'fodao',
    'fuder', 'fudido',

    // Atos sexuais
    'trepar', 'trepada', 'trepao',
    'transar', 'transa', 'transada',
    'gozar', 'gozada', 'gozao',
    'punheta', 'punheteiro', 'punheteira', 'punhetada',
    'boquete', 'boquetao', 'boqueteiro', 'boqueteira',
    'chupar', 'chupada', 'chupao',
    'mamar', 'mamada',
    'enrabar', 'enrabada', 'enrabacao',
    'meter', 'metida', 'metendo',

    // Insultos — orientação
    'viado', 'viadinho', 'viadao', 'viadona',
    'veado', 'veadinho', 'veadao',
    'sapatao', 'sapatona',
    'traveco', 'travecao',
    'baitola', 'baitolao',
    'paneleiro', 'paneleirona',
    'bicha', 'bichona',

    // Insultos — geral pesado
    'puta', 'putinha', 'putona', 'putaria', 'puteiro',
    'fdp', 'fddp', 'vsf', 'vtnc', 'vtc', 'vcc', 'vsfmm', 'tnc', 'tmnc',
    'arrombado', 'arrombada',
    'babaca', 'babacao', 'babacona',
    'corno', 'cornudo', 'cornuda', 'cornao',
    'desgraca', 'desgraçado', 'desgraçada',
    'vagabundo', 'vagabunda', 'vagabundao',
    'piranha', 'piranhao', 'piranhona',
    'safado', 'safada', 'safadao', 'safadona',
    'prostituta', 'prostituicao',
    'retardado', 'retardada', 'retardao',
    'tarado', 'tarada', 'taradao', 'taradona',
    'pervertido', 'pervertida',
    'nojento', 'nojenta',
    'imundo', 'imunda',
    'lazarento', 'lazarenta',

    // Escatologia
    'cagar', 'cagou', 'cagada', 'cagado', 'cagao',
    'mijar', 'mijou', 'mijada', 'mijao', 'mijo',
    'pum', 'peido', 'peidar', 'peidao', 'vomito',

    // Discriminatórios pesados
    'macaco', 'macaca', 'macacada',
    'nego sujo', 'nega suja',
    'preto safado', 'preta safada',

    // Crimes
    'estupro', 'estuprador', 'estuprar', 'estupradora',
];

// ─── Base de palavrões pesados EN ────────────────────────────────────────────

const BASE_EN: string[] = [

    // Frases EN
    'go fuck yourself', 'fuck off', 'fuck you',
    'son of a bitch', 'suck my dick', 'suck my cock', 'suck my ass',
    'eat shit', 'eat my ass', 'eat shit and die',
    'kill yourself', 'go kill yourself', 'go die',
    'i hope you die', 'i will kill you', 'gonna kill you',
    'drop dead', 'piece of shit', 'motherfucker', 'mother fucker',

    // F-word cluster
    'fuck', 'fucker', 'fucking', 'fucked', 'fucks', 'fuckhead',
    'fuckboy', 'fuckface', 'fuckwit', 'fuckwad', 'fuckup',
    'mofo', 'clusterfuck', 'mindfuck', 'assfuck',

    // Shit cluster
    'shit', 'shitty', 'shitting', 'shithead', 'bullshit', 'horseshit',
    'apeshit', 'shithole', 'dipshit', 'shitbag',

    // Ass cluster
    'ass', 'asshole', 'asswipe', 'assface', 'asshat', 'assclown',
    'dumbass', 'jackass', 'fatass', 'smartass', 'lardass',

    // Bitch cluster
    'bitch', 'bitches', 'bitching', 'bitchy',

    // Genitalia EN
    'cunt', 'cunts', 'cuntface',
    'dick', 'dickhead', 'dicks', 'dickface', 'dickwad', 'dickweed',
    'cock', 'cocksucker', 'cockhead', 'cockface',
    'pussy', 'pussies',
    'prick', 'pricks',

    // Sex acts EN
    'blowjob', 'blow job', 'deepthroat',
    'handjob', 'hand job', 'rimjob',
    'cum', 'cumshot', 'cumming', 'cummed',
    'jizz', 'jizzed', 'boner', 'hardon',

    // Slurs EN
    'nigger', 'nigga', 'nigg', 'nword',
    'faggot', 'fag',
    'nazi', 'neo nazi',
    'whore', 'whores', 'whoreface',
    'slut', 'sluts', 'slutty', 'slutface',

    // Other heavy
    'bastard', 'bastards',
    'wanker', 'wank', 'wanking',
    'twat', 'twats', 'bollocks',
    'piss', 'pissed', 'pissing',
    'douchebag', 'douche',
    'scumbag', 'scum', 'turd',

    // Sexual crimes
    'rape', 'rapist', 'raping', 'raped',
    'pedophile', 'pedo', 'pedophilia',

    // Abbreviations / threats
    'kys', 'wtf', 'stfu', 'gtfo', 'foad',
    'milf', 'dilf',
    'retard', 'retarded', 'moron', 'imbecile',
    'dumbfuck', 'dumb fuck',
    'pigfucker', 'dogfucker',
];

// ─── Compilação (ordena do maior para o menor → frases casam antes de palavras) ──

const ALL_BASES = [...BASE_PTBR, ...BASE_EN];

const COMPILED = ALL_BASES
    .sort((a, b) => b.length - a.length)   // ← CRÍTICO: frases longas primeiro
    .map(word => ({ word, regex: wordToRegex(word) }));

// ─── API pública ──────────────────────────────────────────────────────────────

/**
 * Censura palavrões mantendo primeira e última letra.
 *
 * Detecta:
 *  - Normal:      "caralho"          → "c*****o"
 *  - Repetido:    "caralhoooooooo"   → "c**************o"
 *  - Leet:        "c4r4lho"          → "c*****o"
 *  - Separadores: "c.a.r.a.l.h.o"   → censurado
 *  - Frase:       "filho da puta"    → "f***********a"
 */
export function censorMessage(raw: string): string {
    let result = raw;
    for (const { regex } of COMPILED) {
        regex.lastIndex = 0;
        result = result.replace(regex, m => censorWord(m));
    }
    return result;
}

/**
 * Retorna `true` se o texto contém palavrão — mesmo disfarçado.
 *
 * Uso recomendado no room.tsx:
 *
 *   import { censorMessage } from '../../utils/censor';
 *
 *   const handleSend = () => {
 *     if (!inputText.trim() || !isConnected) return;
 *     sendMessage(censorMessage(inputText.trim()));
 *     setInputText('');
 *   };
 */
export function containsProfanity(text: string): boolean {
    return censorMessage(text) !== text;
}

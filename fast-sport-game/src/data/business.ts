import type { BusinessKind } from '../game/types';

/**
 * best   = the expected answer (full points + speed bonus, combo continues)
 * almost = defensible but weaker (25 flat points, combo resets)
 * bad    = wrong (0 point, combo resets)
 */
export type Quality = 'best' | 'almost' | 'bad';

export interface Choice {
  text: string;
  quality: Quality;
}

export interface Scenario {
  id: string;
  kind: BusinessKind;
  prompt: string;
  /** Short context line above the prompt (who is asking). */
  context: string;
  choices: Choice[];
  /** One or two sentences shown right after the answer. */
  explain: string;
}

export const LAW_DISCLAIMER =
  'Situations fictives à visée pédagogique. Elles ne constituent pas un conseil juridique.';

export const SCENARIOS: Scenario[] = [
  // ───────── SPONSOR PANIC · marketing sportif ─────────
  {
    id: 'sp-final',
    kind: 'sponsor',
    context: 'Le sponsor maillot, 2 h avant la finale',
    prompt: 'Il veut toucher les fans pendant la finale. Tu proposes quoi ?',
    choices: [
      { text: 'Une activation interactive pour les supporters', quality: 'best' },
      { text: 'Un logo minuscule en bas de l’écran géant', quality: 'bad' },
      { text: 'Une campagne publiée après la finale', quality: 'almost' },
    ],
    explain: 'Pendant l’événement, l’attention des fans est maximale : l’activation crée de l’engagement mesurable. Après coup, l’émotion est retombée.',
  },
  {
    id: 'sp-kpi',
    kind: 'sponsor',
    context: 'Le directeur partenariats, fin de saison',
    prompt: 'Comment prouver que le partenariat a marché ?',
    choices: [
      { text: 'Compter les likes à la fin', quality: 'almost' },
      { text: 'Comparer aux objectifs fixés dès la signature', quality: 'best' },
      { text: 'Ne rien mesurer : c’est de l’image', quality: 'bad' },
    ],
    explain: 'Un ROI se prouve contre des KPI définis au départ (notoriété, leads, ventes). Les likes seuls ne disent pas grand-chose.',
  },
  {
    id: 'sp-ambassador',
    kind: 'sponsor',
    context: 'Une marque de nutrition sportive',
    prompt: 'Elle cherche un ambassadeur. Ton conseil ?',
    choices: [
      { text: 'Celui qui vient de faire un scandale : buzz garanti', quality: 'bad' },
      { text: 'Le plus suivi, peu importe le sport', quality: 'almost' },
      { text: 'Un athlète aligné avec les valeurs et la cible', quality: 'best' },
    ],
    explain: 'La crédibilité vient de la cohérence athlète / marque / public. L’audience brute ne suffit pas, et le bad buzz abîme la marque.',
  },
  {
    id: 'sp-badbuzz',
    kind: 'sponsor',
    context: 'Lundi, 7 h 30, ton téléphone vibre',
    prompt: 'L’athlète sponsorisé crée une polémique sur les réseaux.',
    choices: [
      { text: 'Réagir vite, factuellement, selon le contrat', quality: 'best' },
      { text: 'Ne rien dire et attendre que ça passe', quality: 'bad' },
      { text: 'Supprimer tous les posts communs', quality: 'almost' },
    ],
    explain: 'En crise, la rapidité et la cohérence comptent. Le contrat prévoit souvent des clauses d’image ou de moralité qui guident la réponse.',
  },
  {
    id: 'sp-local',
    kind: 'sponsor',
    context: 'Une boulangerie partenaire du club amateur',
    prompt: 'Petit budget. Quelle activation choisir ?',
    choices: [
      { text: 'Un spot TV national', quality: 'bad' },
      { text: 'Le goûter offert aux jeunes licenciés le samedi', quality: 'best' },
      { text: 'Un panneau dans la buvette', quality: 'almost' },
    ],
    explain: 'Pour un partenaire local, la proximité avec les familles du club crée de la préférence de marque à moindre coût.',
  },
  {
    id: 'sp-naming',
    kind: 'sponsor',
    context: 'Une banque veut donner son nom à l’arena',
    prompt: 'Comment rendre ce naming efficace ?',
    choices: [
      { text: 'Engagement long terme + expériences pour les fans', quality: 'best' },
      { text: 'Changer de nom chaque saison', quality: 'bad' },
      { text: 'Le nom uniquement sur le parking', quality: 'almost' },
    ],
    explain: 'Un naming s’installe dans le temps et se fait aimer par des activations, pas seulement par un logo.',
  },

  // ───────── LOST IN TRANSLATION · anglais du sport ─────────
  {
    id: 'en-feel',
    kind: 'english',
    context: 'Zone mixte, l’athlète vient de gagner',
    prompt: 'Demande-lui comment il se sent.',
    choices: [
      { text: 'How do you feel right now?', quality: 'best' },
      { text: 'What is your feeling of the win?', quality: 'almost' },
      { text: 'How much do you feel?', quality: 'bad' },
    ],
    explain: '« How do you feel right now? » est la question naturelle en interview. La deuxième se comprend mais sonne comme une traduction mot à mot.',
  },
  {
    id: 'en-draw',
    kind: 'english',
    context: 'Commentaire d’un match de Premier League',
    prompt: 'Comment dire « match nul » ?',
    choices: [
      { text: 'A null match', quality: 'bad' },
      { text: 'A draw', quality: 'best' },
      { text: 'A tie', quality: 'almost' },
    ],
    explain: 'En football britannique, on dit « a draw ». « A tie » est surtout américain. « Null match » n’existe pas.',
  },
  {
    id: 'en-kickoff',
    kind: 'english',
    context: 'Briefing avec un diffuseur anglais',
    prompt: 'Comment dire « le coup d’envoi » ?',
    choices: [
      { text: 'The first shot', quality: 'almost' },
      { text: 'The send kick', quality: 'bad' },
      { text: 'The kick-off', quality: 'best' },
    ],
    explain: '« Kick-off » est le terme consacré, au football comme au rugby : « Kick-off is at 8 pm ».',
  },
  {
    id: 'en-getback',
    kind: 'english',
    context: 'Fin d’un call avec un sponsor américain',
    prompt: '« Je reviens vers vous demain. »',
    choices: [
      { text: 'I come back to you tomorrow.', quality: 'almost' },
      { text: 'I’ll get back to you tomorrow.', quality: 'best' },
      { text: 'I recontact you tomorrow.', quality: 'bad' },
    ],
    explain: '« I’ll get back to you » est la formule pro standard. Le futur avec « will » marque l’engagement.',
  },
  {
    id: 'en-coach',
    kind: 'english',
    context: 'Présentation du staff à un club anglais',
    prompt: 'Comment présenter « l’entraîneur principal » ?',
    choices: [
      { text: 'The head coach', quality: 'best' },
      { text: 'The main entertainer', quality: 'bad' },
      { text: 'The chief trainer', quality: 'almost' },
    ],
    explain: '« Head coach » désigne l’entraîneur principal. « Trainer » évoque plutôt la préparation physique ou les soins.',
  },
  {
    id: 'en-injury',
    kind: 'english',
    context: 'Interview d’un joueur blessé',
    prompt: 'Demande poliment des nouvelles de sa blessure.',
    choices: [
      { text: 'Is your injury finish?', quality: 'bad' },
      { text: 'How is your recovery going?', quality: 'best' },
      { text: 'When are you not broken?', quality: 'bad' },
    ],
    explain: '« How is your recovery going? » est naturel et respectueux. Les deux autres sont incorrectes et maladroites.',
  },
  {
    id: 'en-warmup',
    kind: 'english',
    context: 'Planning d’avant-match en anglais',
    prompt: 'Comment dire « l’échauffement » ?',
    choices: [
      { text: 'The heating', quality: 'bad' },
      { text: 'The warming', quality: 'almost' },
      { text: 'The warm-up', quality: 'best' },
    ],
    explain: '« Warm-up » (nom) et « to warm up » (verbe). « Heating » désigne le chauffage d’un bâtiment.',
  },

  // ───────── CONTRACT CRISIS · droit du sport ─────────
  {
    id: 'law-image',
    kind: 'law',
    context: 'Campagne d’un sponsor, bouclage ce soir',
    prompt: 'Le sponsor veut utiliser la photo d’un athlète dans sa pub. Que fais-tu ?',
    choices: [
      { text: 'Elle est sur Instagram, donc libre : on publie', quality: 'bad' },
      { text: 'Obtenir l’accord écrit de l’athlète (usage, durée, supports)', quality: 'best' },
      { text: 'Demander un accord oral à son coach', quality: 'almost' },
    ],
    explain: 'L’image d’une personne est protégée : un usage publicitaire suppose son autorisation, idéalement écrite et précise. Le coach ne peut pas décider à sa place.',
  },
  {
    id: 'law-minor',
    kind: 'law',
    context: 'Une pépite de 16 ans, une marque très pressée',
    prompt: 'La marque veut qu’il signe seul ce soir.',
    choices: [
      { text: 'Il signe seul, il est majeur sportivement', quality: 'bad' },
      { text: 'Faire signer aussi ses représentants légaux', quality: 'best' },
      { text: 'Faire signer son club à sa place', quality: 'almost' },
    ],
    explain: 'Un mineur ne peut en principe pas s’engager seul dans ce type de contrat : ses représentants légaux doivent intervenir. Le club n’est pas son représentant.',
  },
  {
    id: 'law-rings',
    kind: 'law',
    context: 'Une marque non partenaire des Jeux',
    prompt: 'Elle veut les anneaux olympiques sur sa pub.',
    choices: [
      { text: 'Refuser : ces emblèmes sont protégés', quality: 'best' },
      { text: 'OK si les anneaux sont un peu modifiés', quality: 'almost' },
      { text: 'OK, c’est un symbole universel', quality: 'bad' },
    ],
    explain: 'Les symboles olympiques sont protégés et réservés aux partenaires officiels. Une version « modifiée » reste risquée : c’est de l’ambush marketing.',
  },
  {
    id: 'law-bet',
    kind: 'law',
    context: 'Un joueur de ton équipe, la veille du match',
    prompt: 'Il veut parier sur sa propre compétition.',
    choices: [
      { text: 'Pas de souci s’il parie sur sa victoire', quality: 'bad' },
      { text: 'C’est interdit : il ne parie pas', quality: 'best' },
      { text: 'OK s’il passe par un proche', quality: 'bad' },
    ],
    explain: 'Les acteurs d’une compétition ne peuvent pas parier dessus, directement ou via un tiers. C’est une règle clé contre la manipulation.',
  },
  {
    id: 'law-live',
    kind: 'law',
    context: 'Le community manager du club',
    prompt: 'Il veut diffuser tout le match en live sur TikTok.',
    choices: [
      { text: 'Vérifier qui détient les droits audiovisuels', quality: 'best' },
      { text: 'Go : c’est notre match, donc nos images', quality: 'bad' },
      { text: 'Go, mais en floutant les logos', quality: 'almost' },
    ],
    explain: 'Les droits d’exploitation d’une compétition appartiennent souvent à l’organisateur, qui peut les avoir cédés à un diffuseur. On vérifie avant de filmer.',
  },
  {
    id: 'law-music',
    kind: 'law',
    context: 'La vidéo de présentation de la saison',
    prompt: 'On met un tube célèbre en fond sonore ?',
    choices: [
      { text: 'Oui, si on cite l’artiste', quality: 'almost' },
      { text: 'Oui, la vidéo n’est pas payante', quality: 'bad' },
      { text: 'Seulement avec les droits nécessaires', quality: 'best' },
    ],
    explain: 'Citer l’artiste ne remplace pas une autorisation. Une musique protégée s’utilise avec les droits adaptés, même pour une vidéo gratuite.',
  },
];

export function scenariosOf(kind: BusinessKind): Scenario[] {
  return SCENARIOS.filter((s) => s.kind === kind);
}

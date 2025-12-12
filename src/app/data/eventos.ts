import { Ionicons } from '@expo/vector-icons';

export const EVENTOS_EXEMPLO: { id: number; dia: number; mes: string; titulo: string; descricao: string; icone: keyof typeof Ionicons.glyphMap }[] = [
  { id: 1, dia: 10, mes: 'NOV', titulo: 'Festa do Café', icone: 'cafe', descricao: 'Venha celebrar a cultura do café com música ao vivo, comidas típicas e muito mais! Este evento anual reúne produtores locais e visitantes para uma experiência inesquecível.' },
  { id: 2, dia: 20, mes: 'NOV', titulo: 'Feira Gastronômica', icone: 'pizza', descricao: 'Explore os sabores de Espírito Santo do Pinhal na nossa Feira Gastronômica. Com barracas de comida, workshops culinários e degustações, é o evento perfeito para os amantes da boa comida.' },
  { id: 3, dia: 25, mes: 'NOV', titulo: 'Festival do Vinho', icone: 'wine', descricao: 'Desfrute de uma seleção de vinhos locais e internacionais no Festival do Vinho. Com música ao vivo, palestras sobre vinhos e harmonizações gastronômicas, este evento é imperdível para os apreciadores da bebida.' },
];
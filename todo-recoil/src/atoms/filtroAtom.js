import { atom } from 'recoil';

// Valores possíveis do filtro, centralizados para evitar strings soltas.
export const FILTROS = {
  TODAS: 'todas',
  CONCLUIDAS: 'concluidas',
  PENDENTES: 'pendentes',
};

export const filtroAtom = atom({
  key: 'filtroAtom',
  default: FILTROS.TODAS,
});

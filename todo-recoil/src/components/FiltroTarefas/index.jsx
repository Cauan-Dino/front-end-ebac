import { useRecoilState } from 'recoil';
import { filtroAtom, FILTROS } from '../../atoms/filtroAtom';
import styles from './FiltroTarefas.module.css';

const OPCOES = [
  { valor: FILTROS.TODAS, rotulo: 'Todas' },
  { valor: FILTROS.PENDENTES, rotulo: 'Pendentes' },
  { valor: FILTROS.CONCLUIDAS, rotulo: 'Concluídas' },
];

function FiltroTarefas() {
  // Lê E escreve o filtro: caso clássico de useRecoilState.
  const [filtro, setFiltro] = useRecoilState(filtroAtom);

  return (
    <div className={styles.grupo} role="group" aria-label="Filtrar tarefas">
      {OPCOES.map(({ valor, rotulo }) => (
        <button
          key={valor}
          type="button"
          className={`${styles.opcao} ${filtro === valor ? styles.ativa : ''}`}
          aria-pressed={filtro === valor}
          onClick={() => setFiltro(valor)}
        >
          {rotulo}
        </button>
      ))}
    </div>
  );
}

export default FiltroTarefas;

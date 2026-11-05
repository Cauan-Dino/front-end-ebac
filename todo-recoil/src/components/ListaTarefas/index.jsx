import { useRecoilValue } from 'recoil';
import { tarefasFiltradasSelector } from '../../selectors/tarefasFiltradasSelector';
import { filtroAtom, FILTROS } from '../../atoms/filtroAtom';
import ItemTarefa from '../ItemTarefa';
import styles from './ListaTarefas.module.css';

const MENSAGENS_VAZIAS = {
  [FILTROS.TODAS]: 'Nenhuma tarefa ainda. Adicione a primeira no campo acima.',
  [FILTROS.PENDENTES]: 'Nada pendente. Tudo em dia!',
  [FILTROS.CONCLUIDAS]: 'Nenhuma tarefa concluída ainda.',
};

function ListaTarefas() {
  // Somente leitura: a lista já chega filtrada pelo seletor.
  const tarefas = useRecoilValue(tarefasFiltradasSelector);
  const filtro = useRecoilValue(filtroAtom);

  if (tarefas.length === 0) {
    return <p className={styles.vazio}>{MENSAGENS_VAZIAS[filtro]}</p>;
  }

  return (
    <ul className={styles.lista}>
      {tarefas.map((tarefa) => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}
    </ul>
  );
}

export default ListaTarefas;

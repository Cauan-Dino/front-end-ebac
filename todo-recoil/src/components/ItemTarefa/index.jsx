import { useSetRecoilState } from 'recoil';
import { tarefasAtom } from '../../atoms/tarefasAtom';
import styles from './ItemTarefa.module.css';

function ItemTarefa({ tarefa }) {
  const setTarefas = useSetRecoilState(tarefasAtom);

  // Sempre criamos um novo array/objeto: átomos devem ser tratados como imutáveis.
  const alternarConcluida = () => {
    setTarefas((tarefas) =>
      tarefas.map((item) =>
        item.id === tarefa.id ? { ...item, concluida: !item.concluida } : item
      )
    );
  };

  const remover = () => {
    setTarefas((tarefas) => tarefas.filter((item) => item.id !== tarefa.id));
  };

  const idCheckbox = `tarefa-${tarefa.id}`;

  return (
    <li className={styles.item}>
      <input
        id={idCheckbox}
        className={styles.checkbox}
        type="checkbox"
        checked={tarefa.concluida}
        onChange={alternarConcluida}
      />
      <label
        htmlFor={idCheckbox}
        className={`${styles.texto} ${tarefa.concluida ? styles.concluida : ''}`}
      >
        {tarefa.texto}
      </label>
      <button
        type="button"
        className={styles.remover}
        onClick={remover}
        aria-label={`Remover tarefa: ${tarefa.texto}`}
      >
        Remover
      </button>
    </li>
  );
}

export default ItemTarefa;

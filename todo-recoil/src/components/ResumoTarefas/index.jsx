import { useRecoilValue } from 'recoil';
import { resumoTarefasSelector } from '../../selectors/resumoTarefasSelector';
import styles from './ResumoTarefas.module.css';

function ResumoTarefas() {
  const { total, pendentes } = useRecoilValue(resumoTarefasSelector);

  if (total === 0) return null;

  return (
    <p className={styles.resumo}>
      {pendentes === 0
        ? 'Todas concluídas'
        : `${pendentes} de ${total} ${pendentes === 1 ? 'pendente' : 'pendentes'}`}
    </p>
  );
}

export default ResumoTarefas;

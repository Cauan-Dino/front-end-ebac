import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { tarefasAtom } from '../../atoms/tarefasAtom';
import styles from './FormTarefa.module.css';

function FormTarefa() {
  // Estado local: o texto digitado só interessa a este componente.
  const [texto, setTexto] = useState('');
  // Só precisamos escrever na lista, então useSetRecoilState basta
  // (e evita re-render deste componente quando a lista muda).
  const setTarefas = useSetRecoilState(tarefasAtom);

  const handleSubmit = (evento) => {
    evento.preventDefault();
    const textoLimpo = texto.trim();
    if (!textoLimpo) return;

    setTarefas((tarefasAtuais) => [
      ...tarefasAtuais,
      { id: Date.now(), texto: textoLimpo, concluida: false },
    ]);
    setTexto('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="nova-tarefa" className={styles.rotuloOculto}>
        Nova tarefa
      </label>
      <input
        id="nova-tarefa"
        className={styles.campo}
        type="text"
        placeholder="O que precisa ser feito?"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
      />
      <button className={styles.botao} type="submit" disabled={!texto.trim()}>
        Adicionar
      </button>
    </form>
  );
}

export default FormTarefa;

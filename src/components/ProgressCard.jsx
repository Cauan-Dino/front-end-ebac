import { ArrowDownRight, Check, Leaf, Sparkles } from 'lucide-react';
import { useTodos } from '../context/TodoContext';
export default function ProgressCard() {
  const { stats } = useTodos();
  const percentage = stats.total
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;
  return (
    <aside className="progress-column" aria-label="Resumo das tarefas">
      <div className="progress-card">
        <div className="card-eyebrow">
          <span>SEU PROGRESSO</span>
          <ArrowDownRight size={21} />
        </div>
        <div className="progress-value">
          {percentage}
          <span>%</span>
        </div>
        <p>
          {percentage === 100
            ? 'Um dia de pequenas vitórias.'
            : 'Cada tarefa conta.'}
        </p>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Tarefas concluídas"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
        >
          <span style={{ width: `${percentage}%` }} />
        </div>
        <div className="progress-details">
          <span>
            {stats.completed} de {stats.total} concluídas
          </span>
          <Check size={16} />
        </div>
      </div>
      <div className="encouragement">
        <div className="leaf-illustration">
          <Leaf size={48} strokeWidth={1.1} />
          <Sparkles size={20} />
        </div>
        <h3>
          Menos pressa.
          <br />
          Mais presença.
        </h3>
        <p>Você não precisa fazer tudo hoje. Só precisa dar o próximo passo.</p>
        <span className="handwritten">vai no seu tempo ↗</span>
      </div>
    </aside>
  );
}

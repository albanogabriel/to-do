export interface TaskType {
  id: number
  checked: boolean
  value: string
}

export const tasks: TaskType[] = [
  {
    id: 1,
    checked: true,
    value: 'Comprar pilha no mercado',
  },
  {
    id: 2,
    checked: false,
    value: 'Tomar 2L de água no dia',
  },
  {
    id: 3,
    checked: true,
    value: 'Fazer exercícios',
  },
  {
    id: 4,
    checked: true,
    value: 'Trabalhar',
  }
]

interface IForm {
    nome: string
    email: string
    data: string
    bValue: number
    workScheduleP: number,
    workScheduleV: number,
    vacationsTwelfth: number,
    christmasTwelfth: number,
    otherExpenses: number,
    remoteExpenses: number,
    comunicationsPlafond: number,
    healthInsurance: number,
    checkbox: boolean,
    irsP: number,
  }
  
  type FormState = {
    articles: IForm[]
  }
  
  type FormAction = {
    type: string
    article: IForm
  }
  
  type DispatchType = (args: FormAction) => FormAction
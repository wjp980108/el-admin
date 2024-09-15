export interface Certificate {
  summary: string
  subject: string
  debtor: string
  lender: string
  debtorList?: string[]
  lenderList?: string[]
  isShowDebtorInput?: false
  isShowLenderInput?: false

  [key: string]: any
}

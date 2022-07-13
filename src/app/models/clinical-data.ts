export class ClinicalData {
  id: string = 'DOC_ID_NOT_INITIALIZED'
  type: string = 'DOC_TYPE_NOT_INITIALIZED'
  dtm: Date = new Date(1900, 0, 1)
  summary: AnnotatableText = new AnnotatableText()
  text: AnnotatableText = new AnnotatableText() // Lazy-load and unload after unused to prevent mem issues
}

export class AnnotatableText {
  editable: boolean = false
  text: string = ''
  userSpans: Array<Array<number>> = [[]] // Spans that are annotated by the user
  algorithmSpans: Array<Array<number>> = [[]] // Spans that are annotated by algorithm (e.g. autonomous search)
}

export interface StructuredData {
  code_system: string
  code: string
  desc: string
  dtm: Date
}

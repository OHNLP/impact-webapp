export interface ClinicalDocument {
  id: string
  type: string
  dtm: Date
  summary: AnnotatableText
  text: AnnotatableText | undefined
}

export interface AnnotatableText {
  editable: boolean,
  text: string,
  userSpans: Array<Array<number>>, //Spans that are annotated by the user
  algorithmSpans: Array<Array<number>> // Spans that are annotated by algorithm (e.g. autonomous search)
}

export interface StructuredData {
  code_system: string
  code: string
  desc: string
  dtm: Date
}

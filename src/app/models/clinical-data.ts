export interface ClinicalDocument {
  id: string
  type: string
  date_created: Date
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

export interface Fact {
  // evidence_id
  evidence_id: string,
  type: string,
  date_time: Date,
  summary: string,

  // optional
  full_text?: string,

  // optioanl code
  code?: string,
  code_system?: string,

  // optional. rank or relevant score 
  score: number,

  // FHIR object for everything
  fhir: any
}

export interface FactCollection {
  type: string,
  facts: Fact[]
}
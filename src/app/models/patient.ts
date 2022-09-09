export class Patient {
    id: string = 'PAT_ID_NOT_INITIALIZED'
    name: string = 'PAT_NAME_NOT_INITIALIZED'

    // for this 
    decision: RECRUITMENT_DECISION = RECRUITMENT_DECISION.UNJUDGED

    last_updated: Date | undefined

    // labels for classification in future
    labels: string[] = []
}

export enum RECRUITMENT_DECISION {
    UNJUDGED,
    INCLUDED,
    EXCLUDED
}

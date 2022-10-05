export interface JobInfo {
    job_uid: string,
    project_uid: string,
    start_date: Date,
    status: JobInfoStatus
}

export enum JobInfoStatus {
    QUEUED = "QUEUED",
    PREFLIGHT = "PREFLIGHT",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETE = "COMPLETE",
    ERROR = "ERROR",
    CANCELED = "CANCELED",
}
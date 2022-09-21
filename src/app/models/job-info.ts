export interface JobInfo {
    project_uid: string,
    job_uid: string,
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
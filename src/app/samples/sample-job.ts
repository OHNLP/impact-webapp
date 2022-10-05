import { JobInfoStatus } from "../models/job-info";

export const EXAMPLE_JOBS = [
    {
        job_uid: '046b6c7a-0a8a-43b9-b35d-6489e6daee91',
        project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
        start_date: new Date(),
        status: JobInfoStatus.COMPLETE
    },
    {
        job_uid: '046b6c7b-jobs-43b9-b35d-6489e6daee92',
        project_uid: '046b6c7b-0b8a-43b9-b35d-6489e6daee91',
        start_date: new Date(),
        status: JobInfoStatus.COMPLETE
    },
    {
        job_uid: '046b6c7c-jobs-43b9-b35d-6489e6daee93',
        project_uid: '046b6c7c-0a8c-43b9-b35d-6489e6daee91',
        start_date: new Date(),
        status: JobInfoStatus.ERROR
    },
    {
        job_uid: '046b6c7d-jobs-43b9-b35d-6489e6daee94',
        project_uid: '046b6c7d-0b8b-43b9-b35d-6489e6daee91',
        start_date: new Date(),
        status: JobInfoStatus.CANCELED
    },
    {
        job_uid: '046b6c7e-jobs-43b9-b35d-6489e6daee95',
        project_uid: '046b6c7e-0b8d-43b9-b35d-6489e6daee91',
        start_date: new Date(),
        status: JobInfoStatus.IN_PROGRESS
    },
    {
        job_uid: '046b6c7f-jobs-43b9-b35d-6489e6daee96',
        project_uid: '046b6c7f-0b8e-43b9-b35d-6489e6daee91',
        start_date: new Date(),
        status: JobInfoStatus.QUEUED
    },
]
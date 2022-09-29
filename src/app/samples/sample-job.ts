import { JobInfoStatus } from "../models/job-info";

export const EXAMPLE_JOBS = [
    {
        uid: '046b6c7f-jobs-43b9-b35d-6489e6daee91',
        project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
        start_date: new Date(),
        status: JobInfoStatus.COMPLETE
    },
    {
        project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
        uid: '046b6c7f-jobs-43b9-b35d-6489e6daee92',
        start_date: new Date(),
        status: JobInfoStatus.COMPLETE
    },
    {
        project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
        uid: '046b6c7f-jobs-43b9-b35d-6489e6daee93',
        start_date: new Date(),
        status: JobInfoStatus.ERROR
    },
    {
        project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
        uid: '046b6c7f-jobs-43b9-b35d-6489e6daee94',
        start_date: new Date(),
        status: JobInfoStatus.CANCELED
    },
    {
        project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
        uid: '046b6c7f-jobs-43b9-b35d-6489e6daee95',
        start_date: new Date(),
        status: JobInfoStatus.IN_PROGRESS
    },
    {
        project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
        uid: '046b6c7f-jobs-43b9-b35d-6489e6daee96',
        start_date: new Date(),
        status: JobInfoStatus.QUEUED
    },
]
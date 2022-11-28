import { DataSource } from 'src/app/models/data-source';

export const EXAMPLE_DATA_SOURCES: DataSource[] = [{
    name: "Data Source A for Structure Data",
    description: "OHDSI CDM representation of Structured EHR data from a sample cohort",
    backendID: "ehr"
},
{
    name: "Data Source B for Note Data",
    description: "OHDSI CDM representation of Text EHR data from a sample cohort",
    backendID: "nlp"
}
];
import { PhenotypeRep } from "../models/phenotype";

export const EXAMPLE_PHENOTYPES: PhenotypeRep[] = [
    {
        "dataSourceID": ["ohdsi_epic_clarity", "ohdsi_nlp"],
        "sourceUMLSCUI": "C0017168",
        "representation": "318800",
        "reperesentationDescription": "Gastroesophageal reflux disease",
        "resolverID": "UMLS_to_Athena_Resolver"
    },
    {
        "dataSourceID": ["ohdsi_epic_clarity", "ohdsi_nlp"],
        "sourceUMLSCUI": "C4039982",
        "representation": "46270659",
        "reperesentationDescription": "History of Gastroesophageal reflux disease",
        "resolverID": "UMLS_to_Athena_Resolver"
    },
    {
        "dataSourceID": ["ohdsi_epic_clarity", "ohdsi_nlp"],
        "sourceUMLSCUI": "C4317146",
        "representation": "44783954",
        "reperesentationDescription": "Gastroesophageal reflux disease",
        "resolverID": "UMLS_to_Athena_Resolver"
    }
]
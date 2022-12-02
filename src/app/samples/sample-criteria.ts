import { BinaryRelationalType, BooleanOperationType, CohortDefinition, EntityType, NodeType, ValuePathDef } from "../models/cohort-definition";

export const EXAMPLE_CRITERIA_GERD: CohortDefinition =
{
  "nodeUID": "a156875b-3c91-4d3a-8c00-7f2fdd5cbd38",
  "nodeType": "LOGICAL",
  "type": "AND",
  "title": "root",
  "description": "root",
  "children": [
    {
      "nodeUID": "8ef3689f-5a5c-4495-97c6-967a90ca589a",
      "nodeType": "LOGICAL",
      "type": "AND",
      "title": "Inclusion Criteria",
      "description": "All responses must be “Yes” unless specified as “NA”",
      "children": [
        {
          "nodeUID": "878b2e51-8262-478a-b35d-0784b773f1c3",
          "nodeType": "ENTITY",
          "title": "Age >= 18 years",
          "description": "The age of the participant must be greater than 18.",
          "type": "PERSON",
          "components": [
            {
              "valuePath": "PERSON_DOB",
              "reln": "LT",
              "values": [
                "2005-10-01"
              ]
            }
          ]
        },
        {
          "nodeUID": "e4b4d7d7-7276-4067-b981-d4c2557c2b38",
          "nodeType": "LOGICAL",
          "type": "MIN_OR",
          "numericModifier": 1,
          "title": "Gastroesophageal reflux disease (GERD)",
          "description": "Gastroesophageal reflux disease (GERD)",
          "children": [
            {
              "nodeUID": "cb8274b5-302a-43dc-b852-817653be600f",
              "nodeType": "ENTITY",
              "title": "a. Gastroesophageal reflux disease",
              "description": "Gastroesophageal reflux disease defined by diagnosis. ICD-9: 530.81, ICD-10: K21.9",
              "type": "CONDITION",
              "components": [
                {
                  "valuePath": "CONDITION_CODE",
                  "reln": "EQ",
                  "values": [
                    "Gastroesophageal reflux disease"
                  ],
                  "expandedCodes": [
                    ["1569558", "35208189", "35208190", "725364", "725363", "44822019", "44820924", "318800"]
                  ]
                }
              ]

            },
            {
              "nodeUID": "5d65c3fa-a262-4182-b2c3-b28a884dde59",
              "nodeType": "ENTITY",
              "title": "b. GERD defined by drug duration",
              "description": "GERD defined by drug, duration of use >= 3 months over the last 5 years. Medication includes: omeprazole, esomeprazole, pantoprazole, rabeprazole, dexlansoprazole, lansoprazole, ranitidine, famotidine, cimetidine",
              "type": "MEDICATION",
              "components": [
                {
                  "valuePath": "MEDICATION_CODE",
                  "reln": "IN",
                  "values": [
                    "omeprazole",
                    "esomeprazole",
                    "pantoprazole",
                    "rabeprazole",
                    "dexlansoprazole",
                    "lansoprazole",
                    "ranitidine",
                    "famotidine",
                    "cimetidine"
                  ],
                  "expandedCodes": [
                    ["40221867", "42543965", "923647", "19102188", "19102190", "19019418", "19102189", "19130286", "19130290", "19101742", "19101743", "19101744", "923648", "923720", "923721", "923691", "19061738", "19023551", "19113655", "923690", "923757", "923756", "923645", "1718972", "1718971", "923752", "923753", "37497620", "19123300", "40221868", "19010207", "1719004", "1719006", "19130288", "19130292", "19010180", "923651", "19003320", "40176131", "19034886", "40221050", "19024786", "923682", "923755", "923754", "19125630", "993623", "19128369", "19128367", "37497626"],
                    ["904453", "904460", "19112920", "19123105", "19123103", "904457", "42800719", "40165707", "904490", "904492", "904456", "19101746", "19101790", "19101745", "42800715", "904458", "40222575", "40220768", "40220766", "40222578", "19123104", "35606348", "40165708", "42800716", "40165709", "40165710", "42800720", "40222576", "40222579"],
                    ["948078", "948080", "19129540", "948079", "19080217", "948108", "19128318", "19113991", "19016797", "40168991", "19129541", "948107", "19071430", "19113992"],
                    ["911735", "44784921", "43560634", "40163283", "40163285"],
                    ["19039926", "35603675", "19133802", "19039961", "35603677", "40174233", "40174235", "44784922", "43560635", "19054406", "40163286", "19054407"],
                    ["929887", "929924", "19098167", "929955", "19129803", "19112613", "929922", "929927", "929953", "929889", "19113636", "19121169", "19013434", "19122145", "19122146", "19054442", "19031628", "40167553", "929954", "19031629", "19024820", "19113637", "19121170"],
                    ["961047", "961050", "961082", "961168", "19019696", "961051", "961167", "44818321", "44818368", "44818341", "19122391", "19126405", "1718658", "961162", "19107189", "961083", "961164", "961166", "961264", "19115089", "961086", "19129050", "19079438", "961238", "961163", "19107936", "19107935", "961089", "961087", "961090", "19064522", "19017287", "19054263", "40235792", "19018081", "961236", "961268", "19017288", "19054264", "19018082", "961267", "19012853", "961085", "19124364", "43013806", "19133216", "19003311", "19003290", "961239", "961263", "19035388"],
                    ["953076", "19077242", "35606551", "35606553", "19077220", "40167604", "19021074", "19130460", "19103341", "19077241", "953113", "19027493", "19019002", "953080", "40167605", "40167603", "40236162", "19003315", "19003316", "19046867", "43011788", "19033687", "953146", "953109", "953147", "953110", "40239181", "40239182", "19033716", "953112", "35603521", "993601", "40166934"],
                    ["19100653", "19066499", "19075349", "19064431", "19075371", "19075350", "997319", "19075372", "19063669", "19075373", "44818393", "19003273", "19003275", "19003281", "19003289", "19003286", "19036595", "19003276", "19003283", "19003271", "19010058", "19003287", "19003277", "19003285", "19003272", "19010059", "19003288", "19107357", "40173845", "19003220", "19024858", "997300", "19024859", "19128546", "19003274", "19010177", "19010743", "19003280", "19010744", "19003282", "19010745", "19003284", "19030094", "997312", "40173843", "997395", "19000831"]
                  ]
                }
              ]
            },
            {
              "nodeUID": "e3e63c9d-396f-4109-8d28-3e96cf07af05",
              "nodeType": "ENTITY",
              "title": "c. GERD defined by prior endoscopic diagnosis",
              "description": "GERD defined by prior endoscopic diagnosis of erosive esophagitis. ICD-9: 530.19, ICD-10: K21.0",
              "type": "CONDITION",
              "components": [
                {
                  "valuePath": "CONDITION_CODE",
                  "reln": "IN",
                  "values": [
                    "erosive esophagitis"
                  ],
                  "expandedCodes": [
                    ["4231067", "44832451", "35208188"]
                  ]
                }
              ]
            }
          ]
        },
        {
          "nodeUID": "79fd0ad7-8352-4da1-b28b-6618434e576b",
          "nodeType": "ENTITY",
          "title": "Male",
          "description": "The patient must be male.",
          "type": "PERSON",
          "components": [
            {
              "valuePath": "PERSON_GENDER",
              "reln": "EQ",
              "values": [
                "male"
              ]
            }
          ]
        },
        {
          "nodeUID": "e5c7bdb5-a831-4315-ab6d-ad327acefa45",
          "nodeType": "ENTITY",
          "title": "Obesity (BMI>=30)",
          "description": "Obesity defined as body mass index greater than equal to 30.",
          "type": "OBSERVATION",
          "components": [
            {
              "valuePath": "OBSERVATION_CODE",
              "reln": "EQ",
              "values": [
                "BMI"
              ],
              "expandedCodes": [
                ["40762636", "3038553", "1027485"]
              ]
            },
            {
              "valuePath": "OBSERVATION_VALUE",
              "reln": "GTE",
              "values": [
                "30"
              ]
            }
          ]
        }
      ]
    },
    {
      "nodeUID": "1cdb38df-e830-416b-8dee-74f92fd7f1a6",
      "nodeType": "LOGICAL",
      "type": "NOT",
      "title": "Exclusion Criteria",
      "description": "All responses must be “No”",
      "children": [
        {
          "nodeUID": "a80b8335-85f8-4335-ba72-1330ba657de0",
          "nodeType": "ENTITY",
          "title": "Previous history of esophageal adenocarcinoma/cancer, esophageal squamous carcinoma",
          "description": "Previous history of esophageal adenocarcinoma/cancer, esophageal squamous carcinoma. ICD-9: 150.9, ICD-10: C15.9",
          "type": "CONDITION",
          "components": [
            {
              "valuePath": "CONDITION_CODE",
              "reln": "IN",
              "values": [
                "esophageal adenocarcinoma/cancer"
              ],
              "expandedCodes": [
                ["3656109","44827550", "37615195", "4081043", "766365" ,"44827596", "44825251", "44822865", "1567474", "44834480", "35206457", "35206112", "35206111", "35206113", "35206110", "44836823", "44828728", "44820596", "44821498", "44821723", "44829792", "44829791", "4181343", "4311880", "4178769"]
              ]
            }
          ]
        },
        {
          "nodeUID": "88d82f7a-7be5-448f-b25a-3f9f0074b033",
          "nodeType": "ENTITY",
          "title": "Previous history of endoscopic ablation for Barrett's esophagus",
          "description": "Previous history of endoscopic ablation for Barrett's esophagus. CPT-4: 43229, 43270, 43228, 43258",
          "type": "PROCEDURE",
          "components": [
            {
              "valuePath": "PROCEDURE_CODE",
              "reln": "IN",
              "values": [
                "endoscopic ablation"
              ],
              "expandedCodes": [
                ["44816414", "44816419", "2108879", "2108903"]
              ]
            }
          ]
        },
        {
          "nodeUID": "08eaaba2-2181-410d-8b20-0e2b1c684e6d",
          "nodeType": "ENTITY",
          "title": "Previous history of esophageal squamous dysplasia",
          "description": "Previous history of esophageal squamous dysplasia. ICD-9: 622.10, ICD-10: N87.9",
          "type": "CONDITION",
          "components": [
            {
              "valuePath": "CONDITION_CODE",
              "reln": "IN",
              "values": [
                "esophageal squamous dysplasia"
              ],
              "expandedCodes": [
                ["36715846", "36717489", "36715845"]
              ]
            }
          ]
        },
        {
          "nodeUID": "21ff290c-9cd0-47d6-9b80-23ea98f3f24b",
          "nodeType": "ENTITY",
          "title": "Current Treatment (drug) with oral anticoagulation - warfarin",
          "description": "Current Treatment (drug) with oral anticoagulation - warfarin.",
          "type": "MEDICATION",
          "components": [
            {
              "valuePath": "MEDICATION_CODE",
              "reln": "IN",
              "values": [
                "warfarin"
              ],
              "expandedCodes": [
                ["40163508", "40163510","40163511",  "40163512", "40163513", "40163518", "40163519", "40163520", "40163524", "40163525", "40163526", "40163530", "40163531", "40163534", "40163535", "40163536", "40163540", "40163541", "40163542", "40163546", "40163547", "40163548", "40163549", "40163554", "40163555", "40163556", "40163560", "40163561", "40163562", "40163566", "40163567", "40163568"]
              ]
            }
          ]
        },
        {
          "nodeUID": "199df14e-4bb9-4cdd-a79d-344e410441ee",
          "nodeType": "ENTITY",
          "title": "Current drug w/ Coumadin",
          "description": "Current Treatment (drug) with oral anticoagulation - Coumadin. ",
          "type": "MEDICATION",
          "components": [
            {
              "valuePath": "MEDICATION_CODE",
              "reln": "IN",
              "values": [
                "Coumadin"
              ],
              "expandedCodes": [
                ["40163511", "40163519", "40163525", "40163535", "40163541", "40163547", "40163555", "40163561", "40163567", "40163531"]
              ]
            }
          ]
        },
        {
          "nodeUID": "8eb735f1-ddc8-4749-bd7e-d767bbe1567f",
          "nodeType": "ENTITY",
          "title": "History of cirrhosis",
          "description": "History of cirrhosis. ICD-9: 571.5, ICD-10: K74.60",
          "type": "CONDITION",
          "components": [
            {
              "valuePath": "CONDITION_CODE",
              "reln": "IN",
              "values": [
                "cirrhosis"
              ],
              "expandedCodes": [
                ["192675", "194692", "196463", "605193", "619607", "619608", "1569671", "1569681", "1569682", "3656096", "4003673", "4044071", "4046016", "4046123", "4048083", "4049282", "4049419", "4050640", "4053079", "4055209", "4055210", "4055211", "4055212", "4058680", "4058681", "4058682", "4058685", "4058695", "4059285", "4059287", "4059289", "4064161", "4068119", "4071022", "4093759", "4098583", "4103092", "4133978", "4135822", "4140536", "4141628", "4143008", "4144116", "4148254", "4153294", "4159158", "4184779", "4197819", "4203601", "4219593", "4232955", "4252074", "4268006", "4292401", "4294539", "4300060", "4304584", "4313567", "4340392", "4340393", "4340946", "4345477", "35208338", "35208349", "35208350", "35208351", "37110890", "37111265", "37111266", "37117933", "37396157", "37396401", "37399445", "42539566", "43531723", "44783142", "44805713", "44819802", "44826726", "44832477", "44832478", "45538545", "45539251", "45581912", "45601187", "45605952", "45765440", "45772057", "46269816"]
              ]
            }
          ]
        },
        {
          "nodeUID": "2198d20c-4670-460b-98ee-342880bdc838",
          "nodeType": "ENTITY",
          "title": "History of esophageal varices",
          "description": "History of esophageal varices. ICD-9: 456.20, ICD-10: I85.00",
          "type": "CONDITION",
          "components": [
            {
              "valuePath": "CONDITION_CODE",
              "reln": "IN",
              "values": [
                "esophageal varices"
              ],
              "expandedCodes": [
                ["22340", "23245", "24966", "28779", "28974", "619607", "619608", "765574", "1569400", "1569401", "1569402", "4109883", "4111998", "4112183"]
              ]
            }
          ]
        },
        {
          "nodeUID": "cc1d32f0-87bc-46eb-b29f-6409022d6f58",
          "nodeType": "ENTITY",
          "title": "History of Barrett’s esophagus",
          "description": "History of Barrett’s esophagus. ICD-9: 530.85, ICD-10: K22.7, K22.710, K22.711, K22.719",
          "type": "CONDITION",
          "components": [
            {
              "valuePath": "CONDITION_CODE",
              "reln": "IN",
              "values": [
                "Barrett’s esophagus"
              ],
              "expandedCodes": [
                ["26141", "443344", "1569561", "4025500", "35208197", "36684957", "36684958", "36715844", "44834797", "45557647", "45591579", "45601155", "45605925", "46269823", "46269824", "46269825"]
              ]
            }
          ]
        },
        {
          "nodeUID": "5d76a9ba-19af-4b8a-8b8f-3d279aa2798e",
          "nodeType": "ENTITY",
          "title": "History of endoscopy in the last 5 years",
          "description": "History of endoscopy in the last 5 years. CPT-4: 43235-43270",
          "type": "PROCEDURE",
          "components": [
            {
              "valuePath": "PROCEDURE_CODE",
              "reln": "IN",
              "values": [
                "endoscopy"
              ],
              "expandedCodes": [
                ["2108883", "2108884", "2108885", "2108886", "2108887", "2108888", "2108889", "2108890", "2108891", "2108892", "2108893", "2108894", "2108895", "2108896", "2108897", "2108898", "2108899", "43527935", "44816416", "44816417", "2108900", "2108901", "2108902", "2108903", "2108904", "2108905", "2108906", "2108907", "2108908", "2108909", "2108910", "44816418", "2108911", "2108912", "2108913", "44816419"]
              ]
            }
          ]
        }
      ]
    }
  ]
};

// export const EXAMPLE_CRITERIA_RRMM: CohortDefinition =
// {
//   nodeUID: '45cce24d-65b7-4ab8-b2cd-c16c8d44b722',
//   nodeType: NodeType.BOOLEAN,
//   value_type: BooleanOperationType.AND,
//   title: 'root',
//   description: 'root',
//   children: [
//     {
//       nodeUID: 'c4b9f789-2673-4438-b8a4-9260f5695280',
//       nodeType: NodeType.BOOLEAN,
//       value_type: BooleanOperationType.AND,
//       title: 'Inclusion Criteria',
//       description: 'All responses must be “Yes” unless specified as “NA”',
//       children: [
//         {
//           nodeUID: 'd8151c93-2bf6-4f1b-98c8-ef8809da5bb6',
//           nodeType: "ENTITY",
//           title: 'Age >= 18 years',
//           description: 'The age of the participant must be greater than 18.',
//           entity: {
//             type: EntityType.PERSON,
//             definitionComponents: [{
//               valuePath: ValuePathDef.OBSERVATION_CODE,
//               type: BinaryRelationalType.EQ,
//               values: ['age']
//             }, {
//               valuePath: ValuePathDef.OBSERVATION_VALUE,
//               type: BinaryRelationalType.LTE,
//               values: ['18']
//             }]
//           }
//         }, 
//         {
//           nodeUID: 'd9152c93-2bf6-4f1b-98c8-ef8809da5bb8',
//           nodeType: NodeType.BOOLEAN,
//           value_type: BooleanOperationType.MIN_OR,
//           title: 'Measurable disease by IMWG criteria in Section 11.0',
//           description: 'Measurable disease by IMWG criteria as defined by at least one of the following in Section 11.0',
//           children: [
//             {
//               nodeUID: 'b14d2d45-44f0-4ec6-b621-b5d5c3f7e08d',
//               nodeType: "ENTITY",
//               title: 'a. Serum M-protein >= 0.5 g/dL',
//               description: 'Serum M-protein >= 0.5 g/dL',
//               entity: {
//                 type: EntityType.OBSERVATION,
//                 definitionComponents: [{
//                   valuePath: ValuePathDef.OBSERVATION_CODE,
//                   type: BinaryRelationalType.EQ,
//                   values: ['Serum M-protein']
//                 }, {
//                   valuePath: ValuePathDef.OBSERVATION_VALUE,
//                   type: BinaryRelationalType.GTE,
//                   values: ['0.5']
//                 }]
//               },
//             }, 
//             {
//               nodeUID: 'c14d2d45-42f0-4ec6-b621-b5d5c3f7e08d',
//               nodeType: "ENTITY",
//               title: 'b. Urine M-protein >= 200 mg',
//               description: 'Urine M-protein >= 200 mg in 24-hour collection',
//               entity: {
//                 type: EntityType.OBSERVATION,
//                 definitionComponents: [{
//                   valuePath: ValuePathDef.OBSERVATION_CODE,
//                   type: BinaryRelationalType.EQ,
//                   values: ['Urine M-protein']
//                 }, {
//                   valuePath: ValuePathDef.OBSERVATION_VALUE,
//                   type: BinaryRelationalType.GTE,
//                   values: ['200']
//                 }]
//               },
//             }]
//         }, 
//         {
//           nodeUID: 'x9152ct3-2bf6-4f1b-98c8-ef8809da5bb8',
//           nodeType: "ENTITY",
//           title: 'ECOG Performance Status',
//           description: 'ECOG Performance Status (PS) 0, 1 or 2 (Appendix I).',
//           entity: {
//             type: EntityType.OBSERVATION,
//             definitionComponents: [{
//               valuePath: ValuePathDef.CONDITION_CODE,
//               type: BinaryRelationalType.IN,
//               values: ['ECOG']
//             }]
//           }
//         }, 
//         {
//           nodeUID: 'x9152ct3-lab6-4f1b-98c8-ef8809da5bb8',
//           nodeType: NodeType.BOOLEAN,
//           value_type: BooleanOperationType.MIN_OR,
//           title: 'Lab Values',
//           description: 'Lab values.',
//           children: [
//             {
//               nodeUID: 'a14d2d45-lab0-4ec6-b621-b5d5c3f7e08d',
//               nodeType: "ENTITY",
//               title: 'a. ANC > 1,000',
//               description: 'Absolute neutrophil count (ANC) >= 1000/uL (w/o growth factor support for >= 7 days)',
//               entity: {
//                 type: EntityType.OBSERVATION,
//                 definitionComponents: [{
//                   valuePath: ValuePathDef.OBSERVATION_CODE,
//                   type: BinaryRelationalType.EQ,
//                   values: ['ANC']
//                 }, {
//                   valuePath: ValuePathDef.OBSERVATION_VALUE,
//                   type: BinaryRelationalType.GTE,
//                   values: ['1000']
//                 }]
//               },
//             },
//             {
//               nodeUID: 'b24d2d45-lab0-4ec6-b621-b5d5c3f7e08e',
//               nodeType: "ENTITY",
//               title: 'b. PLT > 50,000',
//               description: 'Un-transfused Platelet count >= 50,000 uL (without platelet transfusion for >=14 days)',
//               entity: {
//                 type: EntityType.OBSERVATION,
//                 definitionComponents: [{
//                   valuePath: ValuePathDef.OBSERVATION_CODE,
//                   type: BinaryRelationalType.EQ,
//                   values: ['PLT']
//                 }, {
//                   valuePath: ValuePathDef.OBSERVATION_VALUE,
//                   type: BinaryRelationalType.GTE,
//                   values: ['50000']
//                 }]
//               },
//             },
//             {
//               nodeUID: 'c24d2d45-lab0-4ec6-b621-b5d5c3f7e08e',
//               nodeType: "ENTITY",
//               title: 'c. HGB > 50,000',
//               description: 'HGB > 50,000',
//               entity: {
//                 type: EntityType.OBSERVATION,
//                 definitionComponents: [{
//                   valuePath: ValuePathDef.OBSERVATION_CODE,
//                   type: BinaryRelationalType.EQ,
//                   values: ['PLT']
//                 }, {
//                   valuePath: ValuePathDef.OBSERVATION_VALUE,
//                   type: BinaryRelationalType.GTE,
//                   values: ['50000']
//                 }]
//               },
//             }
//           ]
//         }
//         ]
//     },
//     {
//       nodeUID: 'af45810x-fa3d-476b-93e8-d96701b0b8d9',
//       nodeType: NodeType.BOOLEAN,
//       value_type: BooleanOperationType.NOT,
//       title: 'Exclusion Criteria',
//       description: 'All responses must be “No”',
//       children: [
//         {
//           nodeUID: '208dbfc2-7a1a-4f63-81fb-594900862730',
//           nodeType: "ENTITY",
//           title: 'Patients known to be HIV positive',
//           description: 'Patients known to be HIV positive and/or currently receiving antiretroviral therapy.',
//           entity: {
//             type: EntityType.DIAGNOSIS,
//             definitionComponents: [{
//               valuePath: ValuePathDef.CONDITION_CODE,
//               type: BinaryRelationalType.IN,
//               values: ['HIV']
//             }]
//           }
//         },
//         {
//           nodeUID: '338dbfc2-7a1a-4f63-81fb-594900862730',
//           nodeType: "ENTITY",
//           title: 'Uncontrolled hypertension or diabetes',
//           description: 'Uncontrolled hypertension or uncontrolled diabetes <= 14 days prior to registration.',
//           entity: {
//             type: EntityType.DIAGNOSIS,
//             definitionComponents: [{
//               valuePath: ValuePathDef.CONDITION_CODE,
//               type: BinaryRelationalType.IN,
//               values: ['hypertension', 'diabete']
//             }]
//           }
//         },
//         {
//           nodeUID: '438dbfc2-7a1a-4f63-81fb-594900862730',
//           nodeType: "ENTITY",
//           title: 'Known active hepatitis A, B, or C infection',
//           description: 'Known active hepatitis A, B, or C infection; or known to be positive for HCV RNA or HBsAg (HBV surface antigen).',
//           entity: {
//             type: EntityType.DIAGNOSIS,
//             definitionComponents: [{
//               valuePath: ValuePathDef.CONDITION_CODE,
//               type: BinaryRelationalType.IN,
//               values: ['hepatitis', 'HCV', 'HBV', 'HBsAg']
//             }]
//           }
//         },
//         {
//           nodeUID: 'y8152ct3-2bf6-4f1b-98c8-ef8809da5bb9',
//           nodeType: "ENTITY",
//           title: 'COPD Status',
//           description: 'Chronic obstructive pulmonary disease (COPD) is a chronic inflammatory lung disease that causes obstructed airflow from the lungs. Symptoms include breathing difficulty, cough, mucus (sputum) production and wheezing.',
//           entity: {
//             type: EntityType.OBSERVATION,
//             definitionComponents: [{
//               valuePath: ValuePathDef.CONDITION_CODE,
//               type: BinaryRelationalType.IN,
//               values: ['COPD']
//             }]
//           }
//         },
//         {
//           nodeUID: 'z9152ct4-2bf6-4f1b-98c8-ef8809da5bb9',
//           nodeType: "ENTITY",
//           title: 'Asthma Status',
//           description: 'Asthma is a condition in which your airways narrow and swell and may produce extra mucus. This can make breathing difficult and trigger coughing, a whistling sound (wheezing) when you breathe out and shortness of breath.',
//           entity: {
//             type: EntityType.OBSERVATION,
//             definitionComponents: [{
//               valuePath: ValuePathDef.CONDITION_CODE,
//               type: BinaryRelationalType.IN,
//               values: ['asthma']
//             }]
//           }
//         }
//       ]
//     }]
// };
// export const EXAMPLE_CRITERIA_RRMM_MD: CohortDefinition =
// {
//   nodeUID: '45cce24d-65b7-4ab8-b2cd-c16c8d44b722',
//   nodeType: NodeType.CATEGORY,
//   title: 'root',
//   description: 'root',
//   value_type: BooleanOperationType.AND,
//   children: [
//     {
//       nodeUID: 'c4b9f789-2673-4438-b8a4-9260f5695280',
//       nodeType: NodeType.CATEGORY,
//       title: 'Inclusion Criteria',
//       description: 'All responses must be “Yes” unless specified as “NA”',
//       value_type: BooleanOperationType.AND,
//       value: 'inclusion_criteria',

//       children: [
//         {
//           nodeUID: 'd8151c93-2bf6-4f1b-98c8-ef8809da5bb6',
//           nodeType: "ENTITY",
//           title: 'Age >= 18 years',
//           description: 'The age of the participant must be greater than 18.',
//           entity: {
//             type: EntityType.PERSON,
//             definitionComponents: [{
//               valuePath: ValuePathDef.CONDITION_CODE,
//               type: BinaryRelationalType.LTE,
//               values: ['18']
//             }]
//           },
//         },
//         {
//           nodeUID: '19a78933-3737-43fa-9b0e-4d9b8b17786c',
//           nodeType: "ENTITY",
//           title: 'Diagnosis of RRMM w/ progressive disease',
//           description: 'Diagnosis of RRMM with progressive disease at study entry as per the International Myeloma Working Group (IMWG) uniform criteria.',
//           value_type: EntityType.PROCEDURE,
//           value: 'Coronary Artery Bypass',
//         },
//         {
//           nodeUID: '3f0ec93c-2e94-44dd-b2b3-f2a480d03f1c',
//           nodeType: NodeType.BOOLEAN,
//           title: 'Measurable disease by IMWG criteria in Section 11.0',
//           description: 'Measurable disease by IMWG criteria as defined by at least one of the following in Section 11.0',
//           value_type: BooleanOperationType.MIN_OR,
//           value: '1',
//           children: [
//             {
//               nodeUID: 'b14d2d45-44f0-4ec6-b621-b5d5c3f7e08d',
//               nodeType: NodeType.BOOLEAN,
//               title: 'a. Serum M-protein >= 0.5 g/dL',
//               description: 'a. Serum M-protein >= 0.5 g/dL',
//               entity: {
//                 type: EntityType.OBSERVATION,
//                 definitionComponents: [{
//                   valuePath: ValuePathDef.OBSERVATION_CODE,
//                   type: BinaryRelationalType.EQ,
//                   values: ['Serum M-protein']
//                 }, {
//                   valuePath: ValuePathDef.OBSERVATION_VALUE,
//                   type: BinaryRelationalType.GTE,
//                   values: ['0.5']
//                 }]
//               },
//             },
//             {
//               nodeUID: '6f90641e-cd8d-4cac-a8c3-0699bc6efa93',
//               nodeType: NodeType.BOOLEAN,
//               title: 'b. Urine M-protein >= 200 mg in 24-hour collection',
//               description: 'b. Urine M-protein >= 200 mg in 24-hour collection',
//               value_type: BooleanOperationType.NOT,
//               value: '',
//             },
//             {
//               nodeUID: '32363253-a123-4094-ab11-efc32e1e1a3b',
//               nodeType: NodeType.BOOLEAN,
//               title: 'c. Serum Free Light Chain level >= 10 mg/dL',
//               description: 'c. Serum Free Light Chain level >= 10 mg/dL',
//               value_type: BooleanOperationType.NOT,
//               value: '',
//             },
//             {
//               nodeUID: 'bcba0be8-496e-431c-a312-875c69a1b4b3',
//               nodeType: NodeType.BOOLEAN,
//               title: 'd. Measurable plasmacytoma',
//               description: 'd. Measurable plasmacytoma (at least one lesion that has a single diameter of >= 2cm on PET scan)',
//               value_type: BooleanOperationType.NOT,
//               value: '',
//             },
//             {
//               nodeUID: '132d09ad-9a2d-44db-923e-3c292b6dcaff',
//               nodeType: NodeType.BOOLEAN,
//               title: 'e. Bone marrow plasma cell >= 30%',
//               description: 'e. Bone marrow plasma cell >= 30%',
//               value_type: BooleanOperationType.NOT,
//               value: '',
//             }
//           ]
//         },
//         {
//           nodeUID: '426a0682-0289-4c11-9b62-5ad9ca4fadf6',
//           nodeType: NodeType.BOOLEAN,
//           title: 'Prior treatment',
//           description: '',
//           value_type: BooleanOperationType.AND,
//           value: '2',
//           children: [
//             {
//               nodeUID: 'd23bcf0a-38fb-4c57-ac6c-c3dab5f18c9b',
//               nodeType: "ENTITY",
//               title: 'Arm A: at least 3 prior lines of therapy',
//               description: 'At least one of the following must be true',
//               value_type: BooleanOperationType.MIN_OR,
//               value: '1',
//               children: [
//                 {
//                   nodeUID: 'ae241cc2-1e4f-498a-9729-a1681682b891',
//                   nodeType: NodeType.BOOLEAN,
//                   title: '(1) Previously at least 3 prior lines of therapy',
//                   description: '(1) Subjects must have been previously treated with at least 3 prior lines of therapy, including a proteasome inhibitor and an TMiD.',

//                 },
//                 {
//                   nodeUID: 'f7080978-b983-432b-ae5b-9d56e0ff920f',
//                   nodeType: NodeType.BOOLEAN,
//                   title: '(2) Subjects who are refractory to carfilzomib and/or po...',
//                   description: 'Subjects who are refractory to carfilzomib and/or pomalidomide may enroll in Am, A using the quad,uplet regimen, SKPd, provided KPd triplet is not the most recent line of prior therapy and that they have been previously treated with at least 3 prior lines of therapy, including a proteasome inhibitor and an IMiD.". Carfilzomib/Pomalidomide refractory status is defined by the IMWG criteria: disease that is nonresponsive (SD or PD) while on therapy, or progresses within 60 days of last therapy in patients who have achieved minimal response (MR) or better at some point previously before then progressing in their disease course.',
//                   value_type: EntityType.DIAGNOSIS,
//                   value: 'theray',
//                 }
//               ]
//             },
//             {
//               nodeUID: 'b52c3c30-d6e5-4c6e-9c55-efc2e86ec7f6',
//               nodeType: "ENTITY",
//               title: 'Arm B: up to 2 prior lines of therapy',
//               description: 'Subjects must have progressive disease and been exposed to up to 2 prior lines of therapy, at least one of which includes both a oroteasome inhibitor and lenalidomide.',
//               value_type: EntityType.DIAGNOSIS,
//               value: 'TKI Test',
//             },
//           ]
//         },
//         {
//           nodeUID: '8e936b93-a0bc-427d-b63e-51aa4b2d0925',
//           nodeType: NodeType.BOOLEAN,
//           title: 'Un-transfused Platelet count >100,000 uL (w/o P.T for >14d)',
//           description: 'Un-transfused Platelet count >= 100,000 uL (without platelet transfusion for >=14 days) for SKPd and >= 100,000 (without platelet transfusion for >= 7 days) for SPd is permitted. Additionally, for both Arms A and B platelet count of >= 75,000 uL is permitted if thrombocytopenia is deemed by the investigator to be secondary to severe bone marrow infiltration (>=50%) by myeloma as determined. \nIs thrombocytopenia is deemed by the investigator to be secondary to severe bone marrow infiltration (>=50%) by myeloma as determined?',
//           value_type: BooleanOperationType.MIN_OR,
//           value: '1',
//           children: [
//             {
//               nodeUID: 'aece5a50-7892-48b1-a8da-bcc3863f6aa7',
//               nodeType: "ENTITY",
//               title: 'Yes. Platelet count >= 75,000?',
//               description: '',
//               value_type: EntityType.DRUG,
//               value: 'Platelet',
//             },
//             {
//               nodeUID: '0f2cc2af-8593-4d71-bcbb-d9e7cbbbbb93',
//               nodeType: NodeType.BOOLEAN,
//               title: 'No. Platelet count >= 100,000?',
//               description: '',
//               value_type: EntityType.DRUG,
//               value: 'Platelet',
//             }
//           ]
//         }
//       ]
//     },
//     {
//       nodeUID: 'af45810e-fa3d-476b-93e8-d96701b0b8d9',
//       nodeType: NodeType.CATEGORY,
//       title: 'Exclusion Criteria',
//       description: 'All responses must be “No”',
//       value_type: BooleanOperationType.NOT,
//       value: 'exclusion_criteria',
//       children: [
//         {
//           nodeUID: '208dbfc2-7a5a-4f63-81fb-594900862730',
//           nodeType: "ENTITY",
//           title: 'History of myocardial infraction <= 6 month',
//           description: 'History of myocardial infraction <= 6 month',
//           value_type: EntityType.PROCEDURE,
//           value: 'myocardial',
//         },
//         {
//           nodeUID: '8c99b343-3dfd-417c-8581-27832bcf76e4',
//           nodeType: "ENTITY",
//           title: 'Failure to recover from acute, reversible effects of prior therapy',
//           description: 'Failure to recover from acute, reversible effects of prior therapy',
//           value_type: EntityType.DIAGNOSIS,
//           value: 'myocardial',
//         }
//       ]
//     },
//     {
//       nodeUID: 'fe5ee78f-0133-4e9e-861e-69ef9fd3c0ab',
//       nodeType: NodeType.CATEGORY,
//       title: 'Registration Check/Other Category',
//       description: 'All responses must be “Yes”',
//       value_type: BooleanOperationType.AND,
//       value: 'registration_check',
//       children: [
//         {
//           nodeUID: '8c1f9c82-e9fa-42b9-84bd-7f5b61f6a3b9',
//           nodeType: "ENTITY",
//           title: 'Consent form signed and dated',
//           description: 'Consent form signed and dated',
//           value_type: EntityType.PROCEDURE,
//           value: 'myocardial',
//         },
//         {
//           nodeUID: '076349b4-c112-4d79-a3ac-1fbe45ab1eb4',
//           nodeType: "ENTITY",
//           title: 'Existence of a signed authorization for use and disclosure',
//           description: 'Existence of a signed authorization for use and disclosure',
//           value_type: EntityType.DIAGNOSIS,
//           value: 'myocardial',
//         },
//         {
//           nodeUID: 'e9520d8e-8543-4fff-938f-ff1eff89b519',
//           nodeType: "ENTITY",
//           title: 'Uncontrolled intercurrent non-cardiac illness at least one',
//           description: 'Uncontrolled intercurrent non-cardiac illness at least one',
//           value_type: EntityType.DIAGNOSIS,
//           value: 'myocardial',
//         },
//         {
//           nodeUID: '77a8366a-e5d0-438f-8717-a2d1325062fe',
//           nodeType: "ENTITY",
//           title: 'Study drug is available on site',
//           description: 'Study drug is available on site',
//           value_type: EntityType.DRUG,
//           value: 'Carfilzomib Bortezomib ixazomib',
//         }
//       ]
//     }
//   ]
// };
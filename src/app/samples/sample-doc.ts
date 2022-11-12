export const EXAMPLE_DOCS = [{
    id: '459f651d-12be-47db-b9a2-40bb1b001308',
    type: 'clinical_note',
    date_created: new Date(),
    text: {
        editable: false,
        text: `Multiple myeloma is a cancer that forms in a type of white blood cell called a plasma cell. Healthy plasma cells help you fight infections by making antibodies that recognize and attack germs.

In multiple myeloma, cancerous plasma cells accumulate in the bone marrow and crowd out healthy blood cells. Rather than produce helpful antibodies, the cancer cells produce abnormal proteins that can cause complications.

Treatment for multiple myeloma isn't always necessary right away. If the multiple myeloma is slow growing and isn't causing signs and symptoms, your doctor may recommend close monitoring instead of immediate treatment. For people with multiple myeloma who require treatment, a number of options are available to help control the disease.

Symptoms

Signs and symptoms of multiple myeloma can vary and, early in the disease, there may be none.

When signs and symptoms do occur, they can include:

- Bone pain, especially in your spine or chest
- Nausea
- Constipation
- Loss of appetite
- Mental fogginess or confusion
- Fatigue
- Frequent infections
- Weight loss
- Weakness or numbness in your legs
- Excessive thirst`,
        userSpans: [
            [256, 267]
        ],
        algorithmSpans: [
            [256, 267]]
    }
}
];


export const EXAMPLE_DOC_FHIR_NLP_CONDITION = {
    "resourceType": "DocumentReference",
    "id": "nlp:CONDITION:2061494",
    "contained": [
      {
        "resourceType": "Condition",
        "id": "nlp:CONDITION:2061494",
        "extension": [
          {
            "url": "nlp:offset",
            "valueString": "3"
          },
          {
            "url": "nlp:text",
            "valueString": "GERD"
          }
        ],
        "code": {
          "coding": [
            {
              "system": "https://athena.ohdsi.org/",
              "code": "318800",
              "display": "Gastroesophageal reflux disease"
            }
          ]
        },
        "subject": {
          "identifier": {
            "value": "2653712"
          }
        },
        "recordedDate": "2012-02-01T13:37:00-06:00"
      }
    ],
    "masterIdentifier": {
      "value": "1251860861"
    },
    "date": "2012-02-01T13:37:00.000-06:00",
    "content": [
      {
        "attachment": {
          "data": "IzEgR0VSRApQYXRpZW50IGhhcyBrbm93biBHRVJELiAKQ3VycmVudGx5LCBzeW1wdG9tcyBhcmUgd2VsbCBjb250cm9sbGVkIG9uIG9tZXByYXpvbGUgMjAgbWcgZGFpbHkuCgojMiBIeXBlcnRlbnNpb24KUGF0aWVudCdzIGJsb29kIHByZXNzdXJlcyBoYXZlIGJlZW4gd2VsbCBjb250cm9sbGVkIG9uIGxpc2lub3ByaWwuICAKSGUgaXMgbm90IGhhdmluZyBhbnkgY2hlc3QgcGFpbiwgcGFscGl0YXRpb25zLCBQTkQsIG9yIG9ydGhvcG5lYS4="
        }
      }
    ]
  }
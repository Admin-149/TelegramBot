export enum EFormField {
    address = 'address',
    contacts = 'contacts',
    description = 'description',
    employment = 'employment',
    format = 'format',
    link = 'link',
    name = 'name',
    salary = 'salary',
    salaryFrom = 'salaryFrom',
    salaryTo = 'salaryTo',
    skills = 'skills',
}

export enum EEmploymentItem {
    full = 'full',
    partial = 'partial',
    project = 'project',
    internship = 'internship',
}

export enum EFormatItem {
    office = 'office',
    remote = 'remote'
}

export interface TTranslation {
    [EFormField.employment]: {
        [key in EEmploymentItem]: string
    },
    [EFormField.format]: {
        [key in EFormatItem]: string
    },
    errors: {
        atLeastOne: string,
        required: string
    },
    labels: {
        [key in EFormField]: string
    },
    placeholders: {
        [EFormField.format]: string
        [EFormField.salary]: string
        [EFormField.skills]: string
    },
    submit: string,
    title: string,
}

export interface TFormData {
    [EFormField.address]: string
    [EFormField.contacts]: string
    [EFormField.description]: string
    [EFormField.employment]: string[]
    [EFormField.format]: string
    [EFormField.link]: string
    [EFormField.name]: string
    [EFormField.salaryFrom]: string
    [EFormField.salaryTo]: string
    [EFormField.skills]: string
}

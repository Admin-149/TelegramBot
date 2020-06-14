import { EEmploymentItem, TTranslation } from './appTypes';
import translationJson from '../translation.json'

export const EmploymentItems: EEmploymentItem[] = [
    EEmploymentItem.full,
    EEmploymentItem.partial,
    EEmploymentItem.project,
    EEmploymentItem.internship
];

export const translation: TTranslation = {...translationJson};

import { LegalDocumentPage } from '../../../components/LegalDocumentPage';
import { TERMS_TITLE, TERMS_BODY } from './termsContent';

export function Terms() {
  return <LegalDocumentPage title={TERMS_TITLE} body={TERMS_BODY} />;
}

import { LegalDocumentPage } from '../../../components/LegalDocumentPage';
import { PRIVACY_TITLE, PRIVACY_BODY } from './privacyContent';

export function Privacy() {
  return <LegalDocumentPage title={PRIVACY_TITLE} body={PRIVACY_BODY} />;
}

import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
export const metadata:Metadata={title:'Cookie Policy',description:'How Zaradera uses essential and optional cookies on this website.'}
export default function Page(){return <LegalPage title="Cookie Policy" description="A straightforward explanation of the small files used by this website." sections={[
  {title:'What cookies are',body:'Cookies and similar browser storage help websites remember choices and operate reliably. Some are necessary for core functionality; others may support measurement with your permission.'},
  {title:'Essential storage',body:'We use local browser storage to remember your selected audience journey and cookie preferences. These choices support the experience and do not require optional consent.'},
  {title:'Analytics and marketing',body:'Optional analytics should run only where configured and permitted by your saved preference. The current site does not intentionally use marketing cookies. Any future change should be reflected here and in the preference controls.'},
  {title:'Managing your choice',body:'You can reject non-essential cookies in the consent notice and clear saved website data in your browser. Clearing it may cause the notice and audience selector to appear again.'},
]}/>}

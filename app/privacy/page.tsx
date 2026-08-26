import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
export const metadata:Metadata={title:'Privacy Policy',description:'How Zaradera Credit Limited handles information submitted through this website.'}
export default function Page(){return <LegalPage title="Privacy Policy" description="How we collect, use, and protect information shared through this website." sections={[
  {title:'Information we collect',body:'We collect information you choose to provide through enquiry forms, such as your name, contact details, country of residence, enquiry category, and message. Basic technical data may also be processed to operate and secure the website.'},
  {title:'How we use information',body:'We use submitted information to respond to enquiries, provide requested support, protect our services, and meet applicable legal obligations. We do not ask for passwords, PINs, or complete payment-card details through this website.'},
  {title:'Sharing and retention',body:'Information may be handled by trusted service providers that help us operate communications and hosting, subject to appropriate safeguards. We retain information only for as long as reasonably necessary for the stated purpose and applicable obligations.'},
  {title:'Your choices',body:'You may request access, correction, or deletion of your personal information where applicable. You can also manage optional cookies through the preference controls on this website.'},
  {title:'Contact',body:'For privacy questions or requests, contact support@zaraderagroup.com. This policy should be reviewed against final operational practices and applicable Nigerian data-protection requirements before launch.'},
]}/>}

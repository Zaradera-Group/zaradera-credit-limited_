import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
export const metadata:Metadata={title:'Terms of Use',description:'Terms governing use of the Zaradera Credit Limited website.'}
export default function Page(){return <LegalPage title="Terms of Use" description="The terms that apply when you browse and interact with this website." sections={[
  {title:'About these terms',body:'By using this website, you agree to use it lawfully and in accordance with these terms. If you do not agree, please discontinue use.'},
  {title:'Information, not financial advice',body:'Website content is general information and does not constitute financial, investment, legal, or tax advice. An enquiry is not an application, approval, commitment, or offer of credit.'},
  {title:'Availability and accuracy',body:'We aim to keep information accurate and services available, but cannot guarantee that every page will always be complete, current, or uninterrupted. Product-specific terms provided through an authorised process take precedence over general website content.'},
  {title:'Acceptable use',body:'You must not misuse the website, attempt unauthorised access, submit unlawful or harmful material, or interfere with its operation.'},
  {title:'Contact',body:'Questions about these terms can be sent to support@zaraderagroup.com. Final terms should be approved by qualified counsel before production launch.'},
]}/>}

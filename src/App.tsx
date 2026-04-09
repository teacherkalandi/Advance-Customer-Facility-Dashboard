import { useState } from 'react';
import SlideViewer from './components/SlideViewer';
import { Slide } from './types';
import { Mail, ShieldCheck, CreditCard, BarChart3, Clock, Scale } from 'lucide-react';

const SLIDES: Slide[] = [
  {
    id: 'intro',
    title: 'Advance Payment Facility',
    subtitle: 'Department of Posts, Government of India',
    type: 'highlight',
    content: [
      'A specialized pre-payment scheme for Corporate and Contractual customers.',
      'Applicable to Speed Post (Domestic), Speed Post Parcel, India Post Parcel, and Magazine Post.',
      'Designed to streamline bulk booking operations without the need for monthly credit clearance.',
      'Governed by the Post Office Regulations, 2024 (effective from 16.12.2024).'
    ]
  },
  {
    id: 'eligibility',
    title: 'Eligibility & Definition',
    subtitle: 'Who can avail this facility?',
    type: 'list',
    content: [
      'Corporate Customer: Refers to anyone providing Speed Post business worth ₹10,000 or more in a calendar month.',
      'Contractual Customer: Customers who enter into a formal agreement with the Department.',
      'Facility is available for both single-location and multi-location booking requirements.',
      'Approval for Single Location: Granted by Director/Chief Postmaster (GPOs) or Divisional Head.'
    ]
  },
  {
    id: 'deposit',
    title: 'Minimum Deposit Requirements',
    subtitle: 'Financial commitment for account opening',
    type: 'table',
    content: [],
    tableData: {
      headers: ['Booking Type', 'Minimum Advance Deposit', 'Approving Authority'],
      rows: [
        ['Single Location', '₹ 1,000 /-', 'Divisional Head / Director'],
        ['Multiple Locations', '₹ 10,000 /-', 'Authority designated to sign agreement'],
        ['NAF (National Account)', '₹ 10,000 /-', 'Nodal Circle Office']
      ]
    }
  },
  {
    id: 'registration',
    title: 'Registration & Approval',
    subtitle: 'Timelines and due diligence',
    type: 'list',
    content: [
      'Time Limit: Registration must be completed within 2 working days from receipt of a complete application.',
      'Due Diligence: Approving authorities must conduct thorough verification before enrollment.',
      'KYC Requirements: Standard documentation as prescribed by the Department must be submitted.',
      'Software Integration: All customers must be registered in the CRM portal by the Divisional Head.'
    ]
  },
  {
    id: 'agreement',
    title: 'Agreement Terms & Renewal',
    subtitle: 'Legal framework and validity',
    type: 'list',
    content: [
      'Maximum Period: Initial agreement is valid for up to 3 years.',
      'Renewal: Can be renewed for 2 years on each occasion under existing terms.',
      'Renewal Initiation: Process must start 2 months prior to expiry to avoid service interruption.',
      'Termination: Either party can terminate with 1 month written notice without assigning reasons.',
      'Security Deposit: Fresh or renewed security deposit required at the time of renewal.'
    ]
  },
  {
    id: 'booking-rules',
    title: 'Operational Booking Rules',
    subtitle: 'Procedures for article submission',
    type: 'list',
    content: [
      'Software: Booking is strictly limited to CSI-POS software. No manual booking allowed.',
      'Balance Limit: Booking of articles is strictly limited to the available advance amount in the account.',
      'Minimum Business: Bulk booking facility will be withdrawn if minimum business is not provided for 2 consecutive months.',
      'Provisional Receipts: Issued (Annexure-G) when items are handed over, pending full system entry.'
    ]
  },
  {
    id: 'data-submission',
    title: 'Electronic Data Submission',
    subtitle: 'Mandatory Excel/XML formats',
    type: 'list',
    content: [
      'Format: Booking data must be provided in MS-Excel format or exchanged remotely via .xml.',
      'Required Fields: Barcode, Destination PIN, Full Sender/Addressee names, Mobile Nos, Weight, and Dimensions.',
      'Paper Manifest Penalty: If only a paper manifest is provided without a soft copy, the applicable discount is reduced by half.',
      'Support: CEPT provides server-level support for remote data exchange.'
    ]
  },
  {
    id: 'article-prep',
    title: 'Article Preparation & Declaration',
    subtitle: 'Physical requirements for mail',
    type: 'list',
    content: [
      'Superscription: Must clearly state "Speed Post" or "Registered Letter".',
      'Labeling: Full names, addresses, PIN codes, and Mobile numbers must be visible.',
      'Customer ID: The allotted Advance Deposit ID must be printed on the article.',
      'Declaration: Customer must certify that items contain no dangerous or prohibited goods (Post Office Act, 2023).',
      'Verification: Booking PA checks physical weight and destination PIN against the manifest.'
    ]
  },
  {
    id: 'billing',
    title: 'Billing & Charges Statement',
    subtitle: 'Account management and transparency',
    type: 'list',
    content: [
      'Statement Cycle: Department raises a charges statement by the 7th of every month.',
      'Content: Reflects all consignments booked in the preceding month, utilized amount, and available balance.',
      'Fortnightly Option: Available for customers with monthly revenue exceeding ₹50 lakhs.',
      'GST: Applicable as per standard Speed Post rules and reflected in the monthly bill.'
    ]
  },
  {
    id: 'payments',
    title: 'Payment Methods & Realization',
    subtitle: 'Funding the advance account',
    type: 'list',
    content: [
      'Modes: Cash, Crossed Cheque, Demand Draft, or Online (ECS, NEFT, RTGS, IMPS).',
      'Official Date: The date of realization into the Government account is the official date of deposit.',
      'Bank Clearance: Customers must account for clearance times (usually 1-3 days) to maintain booking privileges.',
      'System Update: SAP system is updated only after successful realization of funds.'
    ]
  },
  {
    id: 'discounts',
    title: 'Discount Benefits',
    subtitle: 'Incentives for Advance Payment users',
    type: 'table',
    content: [],
    tableData: {
      headers: ['Monthly Revenue', 'Base Discount', 'Additional Advance Rebate', 'Total Eligible'],
      rows: [
        ['₹ 50,001 - 5 Lakhs', '10%', '+ 1%', '11%'],
        ['₹ 5 Lakhs - 25 Lakhs', '15%', '+ 1%', '16%'],
        ['₹ 25 Lakhs - 1 Cr', '20%', '+ 2%', '22%'],
        ['₹ 1 Cr - 5 Cr', '25%', '+ 2%', '27%'],
        ['Above ₹ 5 Cr', '30%', '+ 2%', '32%']
      ]
    }
  },
  {
    id: 'form-a2',
    title: 'Agreement Format',
    subtitle: 'Annexure – A2 (Non-BNPL)',
    type: 'form',
    formId: 'annexure-a2',
    content: []
  },
  {
    id: 'form-b',
    title: 'Application Form',
    subtitle: 'Annexure – B (Registration)',
    type: 'form',
    formId: 'annexure-b',
    content: []
  },
  {
    id: 'form-u',
    title: 'E-Payment Deposit Form',
    subtitle: 'Annexure – U (Funding)',
    type: 'form',
    formId: 'annexure-u',
    content: []
  },
  {
    id: 'records',
    title: 'Records & Inspection',
    subtitle: 'Auditing and preservation',
    type: 'list',
    content: [
      'Preservation: All records must be preserved for 2 years after account closure.',
      'Inspection: Authorized officers conduct annual checks on registers and machine logs.',
      'Verification: 2D barcodes on articles are randomly scanned to verify genuineness and correct postage.',
      'Discrepancies: Any mismatch between machine data and website reports must be reported immediately.'
    ]
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-post-light flex flex-col items-center justify-center p-4 md:p-8">
      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-2 bg-post-red z-50" />
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-post-red blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-post-red blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
          <div>
            <div className="flex items-center gap-2 text-post-red font-bold uppercase tracking-widest text-sm mb-2">
              <ShieldCheck className="w-5 h-5" />
              Official Training Module
            </div>
            <h1 className="text-4xl font-black text-post-dark tracking-tighter">
              ADVANCE DEPOSIT <span className="text-post-red">FACILITY</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-post-red" />
              <div className="text-xs">
                <p className="text-post-gray font-bold uppercase">Min Deposit</p>
                <p className="font-bold text-post-dark">₹ 1,000 / ₹ 10,000</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-post-red" />
              <div className="text-xs">
                <p className="text-post-gray font-bold uppercase">Max Discount</p>
                <p className="font-bold text-post-dark">Up to 32%</p>
              </div>
            </div>
          </div>
        </div>

        <SlideViewer 
          slides={SLIDES} 
          currentSlideIndex={currentSlide} 
          onNext={nextSlide} 
          onPrev={prevSlide} 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
          <div className="flex items-center gap-3 text-post-gray">
            <Clock className="w-5 h-5" />
            <p className="text-sm font-medium">Registration: 2 Working Days</p>
          </div>
          <div className="flex items-center gap-3 text-post-gray justify-center">
            <Scale className="w-5 h-5" />
            <p className="text-sm font-medium">Post Office Regulations 2024</p>
          </div>
          <div className="flex items-center gap-3 text-post-gray justify-end">
            <Mail className="w-5 h-5" />
            <p className="text-sm font-medium">Corporate & Contractual Services</p>
          </div>
        </div>
      </div>
    </div>
  );
}

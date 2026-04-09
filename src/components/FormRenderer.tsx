import { useRef } from 'react';
import { Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface FormRendererProps {
  formId: string;
  title: string;
}

export default function FormRenderer({ formId, title }: FormRendererProps) {
  const formRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!formRef.current) return;
    
    const canvas = await html2canvas(formRef.current, {
      scale: 2,
      useCORS: true,
      logging: false
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${formId}.pdf`);
  };

  const renderFormContent = () => {
    switch (formId) {
      case 'annexure-a2':
        return (
          <div className="space-y-4 text-[10px] sm:text-xs leading-relaxed text-post-dark">
            <h3 className="text-center font-bold text-sm sm:text-base border-b pb-2 mb-4">Annexure – A2: Format of Agreement for Non-BNPL Customer</h3>
            <p>An agreement made this ________ day of ________ between the Department of Posts on behalf of the President of India and ____________________ residing at ____________________.</p>
            <p>Whereas the Department has agreed with the sender to book, transmit and deliver articles presented as Speed Post document(domestic) under <strong>Advance Deposit</strong> facility.</p>
            <div className="space-y-2">
              <p>1. Agreement valid for a period of three years.</p>
              <p>2. Sender shall prepare, pack and make up consignments as prescribed.</p>
              <p>3. Expected monthly postage: Rs. __________.</p>
              <p>4. Department shall raise charges statement by 7th of every month.</p>
            </div>
            <div className="pt-8 flex justify-between">
              <div>Signed by: ________________<br/>(For President of India)</div>
              <div>Signed by: ________________<br/>(The Sender)</div>
            </div>
          </div>
        );
      case 'annexure-b':
        return (
          <div className="space-y-4 text-[10px] sm:text-xs text-post-dark">
            <h3 className="text-center font-bold text-sm sm:text-base border-b pb-2 mb-4">Annexure – B: Application for Registration as Bulk Customer</h3>
            <div className="grid grid-cols-2 gap-2 border p-2">
              <div className="font-bold border-r pr-2">Name of Service</div><div>Speed Post</div>
              <div className="font-bold border-r pr-2 border-t pt-1">Category</div><div className="border-t pt-1">Other than e-Commerce</div>
              <div className="font-bold border-r pr-2 border-t pt-1">Mode of Payment</div><div className="border-t pt-1">Advance Deposit</div>
              <div className="font-bold border-r pr-2 border-t pt-1">Min. Deposit</div><div className="border-t pt-1">Rs. 1,000 / Rs. 10,000</div>
            </div>
            <div className="space-y-2">
              <p className="font-bold">Contact Details:</p>
              <p>Name: ____________________</p>
              <p>Address: ____________________</p>
              <p>PAN/TIN/Aadhaar: ____________________</p>
            </div>
            <div className="pt-4">
              <p>I have read and agree to all conditions relating to Advance Payment facility.</p>
              <p className="mt-4">Date: ________ Place: ________ Signature: ________________</p>
            </div>
          </div>
        );
      case 'annexure-u':
        return (
          <div className="space-y-4 text-[10px] sm:text-xs text-post-dark">
            <h3 className="text-center font-bold text-sm sm:text-base border-b pb-2 mb-4">Annexure – U: Form for Deposit through E-Payment</h3>
            <div className="space-y-3 border p-4 rounded">
              <p>1. Name of Post Office: ____________________</p>
              <p>2. Name & Address of Licensee: ____________________</p>
              <p>3. License Identifier (X123456): ____________________</p>
              <p>4. Customer Reference Number (CRN): ____________________</p>
              <p>5. Amount of Deposit (Rs.): ____________________</p>
              <p>6. Mode: Cash / Cheque / Draft / Online</p>
            </div>
            <div className="pt-4 flex justify-between italic">
              <p>Signature of Licensee</p>
              <p>Postmaster Stamp</p>
            </div>
          </div>
        );
      default:
        return <p className="text-center text-post-gray py-12">Form template for {title} is coming soon.</p>;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end mb-4">
        <button 
          onClick={downloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-post-dark text-white rounded-lg text-sm font-bold hover:bg-black transition-all shadow-sm active:scale-95"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>
      
      <div className="flex-1 bg-gray-50 p-4 sm:p-8 rounded-xl border border-dashed border-gray-300 overflow-auto">
        <div 
          ref={formRef} 
          className="bg-white p-6 sm:p-10 shadow-lg mx-auto w-full max-w-[210mm] min-h-[297mm] border border-gray-200"
          style={{ fontFamily: 'serif' }}
        >
          <div className="flex items-center justify-between mb-8 border-b-2 border-post-red pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-post-red rounded flex items-center justify-center">
                <FileText className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-post-red uppercase tracking-tighter">India Post</h2>
                <p className="text-[10px] text-post-gray font-bold uppercase tracking-widest">Government of India</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-post-dark uppercase">Official Document</p>
              <p className="text-[8px] text-post-gray uppercase tracking-tighter">Advance Payment Facility</p>
            </div>
          </div>
          
          {renderFormContent()}
          
          <div className="mt-12 pt-8 border-t border-gray-100 text-[8px] text-post-gray flex justify-between">
            <p>© Department of Posts - 2024 Regulations</p>
            <p>Generated via India Post Digital Guide</p>
          </div>
        </div>
      </div>
    </div>
  );
}

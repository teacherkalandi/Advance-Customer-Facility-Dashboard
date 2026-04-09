import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, List, Info, Table as TableIcon, AlertCircle, FileText, FileDown } from 'lucide-react';
import { Slide } from '../types';
import FormRenderer from './FormRenderer';

interface SlideViewerProps {
  slides: Slide[];
  currentSlideIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function SlideViewer({ slides, currentSlideIndex, onNext, onPrev }: SlideViewerProps) {
  const slide = slides[currentSlideIndex];

  const getIcon = (type: string) => {
    switch (type) {
      case 'list': return <List className="w-6 h-6 sm:w-8 sm:h-8 text-post-red" />;
      case 'table': return <TableIcon className="w-6 h-6 sm:w-8 sm:h-8 text-post-red" />;
      case 'highlight': return <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-post-red" />;
      case 'form': return <FileDown className="w-6 h-6 sm:w-8 sm:h-8 text-post-red" />;
      default: return <Info className="w-6 h-6 sm:w-8 sm:h-8 text-post-red" />;
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[700px] sm:h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100">
      {/* Header */}
      <div className="bg-post-red p-4 sm:p-6 flex justify-between items-center text-white shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-post-gold" />
          <h2 className="text-sm sm:text-xl font-bold tracking-tight uppercase truncate max-w-[200px] sm:max-w-none">India Post | Advance Payment</h2>
        </div>
        <div className="text-xs sm:text-sm font-medium opacity-80 whitespace-nowrap">
          {currentSlideIndex + 1} / {slides.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-100 shrink-0">
        <motion.div 
          className="h-full bg-post-gold"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 sm:p-12 overflow-y-auto relative bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full flex flex-col"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="p-2 sm:p-3 bg-red-50 rounded-xl shrink-0">
                {getIcon(slide.type)}
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-post-dark leading-tight">{slide.title}</h1>
                {slide.subtitle && <p className="text-xs sm:text-post-gray font-medium mt-1">{slide.subtitle}</p>}
              </div>
            </div>

            <div className="flex-1">
              {slide.type === 'form' && slide.formId ? (
                <FormRenderer formId={slide.formId} title={slide.title} />
              ) : slide.type === 'table' && slide.tableData ? (
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="w-full text-left border-collapse min-w-[400px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        {slide.tableData.headers.map((header, i) => (
                          <th key={i} className="p-3 sm:p-4 text-[10px] sm:text-xs font-bold text-post-gray uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {slide.tableData.rows.map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          {row.map((cell, j) => (
                            <td key={j} className="p-3 sm:p-4 text-xs sm:text-sm text-post-dark font-medium">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <ul className="space-y-4 sm:space-y-6">
                  {slide.content.map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="flex items-start gap-3 sm:gap-4"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-post-red shrink-0" />
                      <p className="text-sm sm:text-lg text-post-dark leading-relaxed">{item}</p>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center shrink-0">
        <button 
          onClick={onPrev}
          disabled={currentSlideIndex === 0}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-base text-post-dark hover:bg-white hover:shadow-md disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </button>
        
        <div className="flex gap-1 sm:gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${i === currentSlideIndex ? 'bg-post-red w-4 sm:w-6' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        <button 
          onClick={onNext}
          disabled={currentSlideIndex === slides.length - 1}
          className="flex items-center gap-1 sm:gap-2 px-4 sm:px-8 py-2 sm:py-2.5 bg-post-red text-white rounded-full font-bold text-xs sm:text-base hover:bg-red-700 hover:shadow-lg disabled:opacity-30 disabled:hover:bg-post-red disabled:hover:shadow-none transition-all cursor-pointer"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">Next</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}

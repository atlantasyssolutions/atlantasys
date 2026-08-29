import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Generate intelligent page numbers window (e.g., [1, '...', 4, 5, 6, '...', 42])
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithEllipsis = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithEllipsis.push(1, '...');
    } else {
      rangeWithEllipsis.push(1);
    }

    rangeWithEllipsis.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithEllipsis.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithEllipsis.push(totalPages);
    }

    return rangeWithEllipsis;
  };

  const pages = getPageNumbers();

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '48px', flexWrap: 'wrap' }}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="btn btn-secondary btn-sm"
        style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer', padding: '8px 14px' }}
        aria-label="Previous Page"
      >
        <ChevronLeft size={16} /> Prev
      </button>

      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} style={{ padding: '0 8px', color: 'var(--text-muted)', fontWeight: '600' }}>
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              minWidth: '38px',
              height: '38px',
              padding: '0 10px',
              borderRadius: '8px',
              border: page === currentPage ? '1px solid var(--primary-blue)' : '1px solid var(--border-color)',
              background: page === currentPage ? 'var(--primary-blue)' : '#FFFFFF',
              color: page === currentPage ? '#FFFFFF' : 'var(--text-main)',
              fontWeight: '700',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="btn btn-secondary btn-sm"
        style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', padding: '8px 14px' }}
        aria-label="Next Page"
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}

import { MapPin, AlertCircle, Wrench, Trophy } from 'lucide-react';
import { getLocationBySlug } from '@/lib/locations';

export default function LocalMarketContext({ citySlug }) {
  const location = getLocationBySlug(citySlug);
  
  if (!location) return null;

  return (
    <div style={{
      marginBottom: '36px',
      padding: '24px 28px',
      background: '#F8FAFC',
      borderRadius: '12px',
      border: '1px solid #E2E8F0',
      borderLeft: '5px solid var(--accent-emerald)'
    }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '800',
        color: 'var(--text-main)',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <MapPin size={20} style={{ color: 'var(--accent-emerald)' }} />
        Operational Context: {location.city}, {location.country}
      </h3>
      
      <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.7' }}>
        {location.localMarketContext ? (
          <p>{location.localMarketContext}</p>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0F2D4E' }}>
                <AlertCircle size={16} style={{ color: 'var(--primary-blue)' }} /> Local Fleet Challenge
              </strong>
              <p style={{ margin: '4px 0 0 22px', color: 'var(--text-muted)' }}>{location.primaryChallenge}</p>
            </div>
            
            <div>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0F2D4E' }}>
                <Wrench size={16} style={{ color: 'var(--primary-blue)' }} /> Recommended Hardware
              </strong>
              <p style={{ margin: '4px 0 0 22px', color: 'var(--text-muted)' }}>{location.recommendedHardware}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

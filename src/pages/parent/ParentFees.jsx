import React from 'react';
import { 
  CreditCard, 
  TrendingDown, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  FileText, 
  Calendar, 
  PieChart, 
  ArrowRight,
  Wallet,
  History
} from 'lucide-react';

const ParentFees = () => {
  return (
    <div className="parent-module animate-fade">
      {/* Header with CTA */}
      <div className="flex-between">
        <div>
          <h2 style={{ fontWeight: 700, fontSize: '1.8rem', color: '#0f172a', marginBottom: '4px' }}>Academic Fee Portal</h2>
          <p className="text-muted" style={{ fontSize: '1rem' }}>Full visibility into tuition fees, payment schedules, and compliance.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '8px' }}>
          <CreditCard size={18} /> Pay Fees
        </button>
      </div>

      {/* Row 1: Alerts & AI Insight */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '1.5rem', marginTop: '2rem' }}>
        <div className="module-card" style={{ background: '#fff0f0', border: '1px solid #ffe5e5', padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="flex-start" style={{ color: '#FF3B30', marginBottom: '1rem' }}>
            <AlertCircle size={28} />
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Priority Payment Alert</h3>
          </div>
          <p style={{ margin: 0, color: '#FF3B30', fontWeight: 600, fontSize: '1.1rem' }}>₹30,000 due in 5 days</p>
          <p style={{ margin: '4px 0 0', color: '#FF3B30', fontSize: '0.85rem' }}>Late fee of ₹500 will be applied starting Oct 16.</p>
        </div>

        <div className="module-card" style={{ background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.05)', borderLeft: '4px solid #007AFF', padding: '1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ flex: 1 }}>
            <div className="flex-start" style={{ marginBottom: '0.5rem' }}>
              <TrendingDown size={22} color="#007AFF" />
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: '#1d1d1f' }}>Learning Assistant Insight</h3>
            </div>
            <p style={{ margin: 0, color: '#1d1d1f', lineHeight: '1.6', fontSize: '1rem' }}>
              "Thank you for keeping up with tuition payments! We did notice a slight dip in your child's academic performance recently <span style={{ color: '#FF3B30', fontWeight: 700 }}>(-4% YoY)</span>. We're here to help them get back on track!"
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: Fees Overview & Payment Progress */}
      <div className="module-card" style={{ marginTop: '1.5rem', padding: '2rem', background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: '#1d1d1f' }}>Semester 1 Fee Record</h3>
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>Total Fees (Year 1)</p>
            <h3 style={{ margin: '4px 0 0', fontSize: '1.6rem', color: '#1d1d1f' }}>₹1,00,000</h3>
          </div>
          <div>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>Total Paid</p>
            <h3 style={{ margin: '4px 0 0', fontSize: '1.6rem', color: '#34C759' }}>₹70,000</h3>
          </div>
          <div>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>Outstanding Amount</p>
            <h3 style={{ margin: '4px 0 0', fontSize: '1.6rem', color: '#FF3B30' }}>₹30,000</h3>
          </div>
          <div>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>Next Payment Due</p>
            <h3 style={{ margin: '4px 0 0', fontSize: '1.6rem', color: '#1d1d1f' }}>Oct 15, 2024</h3>
          </div>
        </div>

        <div>
          <div className="flex-between" style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#86868b' }}>Payment Status</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34C759' }}>70% PAID</span>
          </div>
          <div style={{ height: '12px', background: '#f5f5f7', borderRadius: '50px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '70%', background: '#34C759', borderRadius: '50px' }}></div>
          </div>
        </div>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        <div className="module-card" style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="flex-start" style={{ marginBottom: '1.2rem' }}>
            <PieChart size={20} color="#007AFF" />
            <h4 style={{ margin: 0, fontWeight: 600, color: '#1d1d1f' }}>Fee Structure Breakdown</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
             <div className="flex-between">
               <span className="text-muted" style={{ fontSize: '0.9rem' }}>Tuition Fees (Annual)</span>
               <span style={{ fontWeight: 600, color: '#1d1d1f' }}>₹70,000</span>
             </div>
             <div className="flex-between">
               <span className="text-muted" style={{ fontSize: '0.9rem' }}>Hostel & Infrastructure</span>
               <span style={{ fontWeight: 600, color: '#1d1d1f' }}>₹20,000</span>
             </div>
             <div className="flex-between">
               <span className="text-muted" style={{ fontSize: '0.9rem' }}>Examination & Resources</span>
               <span style={{ fontWeight: 600, color: '#1d1d1f' }}>₹5,000</span>
             </div>
             <div className="flex-between">
               <span className="text-muted" style={{ fontSize: '0.9rem' }}>Laboratory Charges</span>
               <span style={{ fontWeight: 600, color: '#1d1d1f' }}>₹5,000</span>
             </div>
          </div>
        </div>

        <div className="module-card" style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="flex-start" style={{ marginBottom: '1.2rem' }}>
            <Calendar size={20} color="#007AFF" />
            <h4 style={{ margin: 0, fontWeight: 600, color: '#1d1d1f' }}>Due Schedule</h4>
          </div>
          <div style={{ gap: '12px', display: 'flex', flexDirection: 'column' }}>
            <div className="flex-between" style={{ padding: '10px', background: '#f5f5f7', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#1d1d1f' }}>Final Installment (Sem 1)</p>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>Oct 15, 2024</p>
              </div>
              <span style={{ fontWeight: 700, color: '#FF3B30' }}>₹30,000</span>
            </div>
            <div className="flex-between" style={{ padding: '10px', background: '#f5f5f7', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)', opacity: 0.8 }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#1d1d1f' }}>Semester 2 Deposit</p>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>Jan 20, 2025</p>
              </div>
              <span style={{ fontWeight: 700, color: '#1d1d1f' }}>₹50,000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="module-card" style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <div className="flex-start">
             <Wallet size={20} color="#007AFF" />
             <h4 style={{ margin: 0, fontWeight: 600, color: '#1d1d1f' }}>Verified Transaction History</h4>
          </div>
        </div>
        <table className="data-table" style={{ marginTop: 0 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px' }}>Date</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Description</th>
              <th style={{ textAlign: 'center', padding: '12px' }}>Amount</th>
              <th style={{ textAlign: 'center', padding: '12px' }}>Method</th>
              <th style={{ textAlign: 'center', padding: '12px' }}>Status</th>
              <th style={{ textAlign: 'right', padding: '12px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px' }}>Feb 15, 2024</td>
              <td style={{ padding: '12px' }}>Tuition Fee - Sem 2</td>
              <td style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>₹40,000</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>Card</td>
              <td style={{ padding: '12px', textAlign: 'center' }}><span className="badge success">🟢 Paid</span></td>
              <td style={{ padding: '12px', textAlign: 'right' }}>
                <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  <Download size={12} style={{ marginRight: '6px' }} /> Receipt
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px' }}>Jan 10, 2024</td>
              <td style={{ padding: '12px' }}>Tuition Fee - Sem 1</td>
              <td style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>₹30,000</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>UPI</td>
              <td style={{ padding: '12px', textAlign: 'center' }}><span className="badge success">🟢 Paid</span></td>
              <td style={{ padding: '12px', textAlign: 'right' }}>
                <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  <Download size={12} style={{ marginRight: '6px' }} /> Receipt
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        <div className="module-card" style={{ padding: '1.5rem', background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="flex-start" style={{ marginBottom: '1rem', color: '#34C759' }}>
            <CheckCircle2 size={18} />
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Account Standing</h4>
          </div>
          <p style={{ margin: 0, color: '#1d1d1f', fontWeight: 500, lineHeight: 1.5 }}>
            "Your account is in <span style={{ color: '#34C759', fontWeight: 700 }}>Great Standing</span>. All semester installments have been cleared on time, with no late fees. Thank you for your punctuality!"
          </p>
        </div>

        <div className="module-card" style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="flex-start" style={{ marginBottom: '1rem' }}>
            <History size={18} color="#007AFF" />
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1d1d1f' }}>Archive: Previous Records</h4>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.8 }}>
             <span style={{ fontSize: '0.9rem', color: '#1d1d1f' }}>Bridge Course - Batch 2023</span>
             <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>View Statement</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ParentFees;

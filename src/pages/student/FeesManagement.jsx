import React from 'react';
import { 
  CreditCard, Download, AlertCircle, CheckCircle2, TrendingDown, 
  PieChart as PieChartIcon, Calendar, Wallet, FileText, ArrowRight 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const feeStructureData = [
  { name: 'Tuition Fee', value: 70000, color: '#007AFF' },
  { name: 'Hostel & Mess', value: 20000, color: '#5856D6' },
  { name: 'Exam Fees', value: 5000, color: '#FF9500' },
  { name: 'Library & Misc', value: 5000, color: '#34C759' },
];

const FeesManagement = () => {
  return (
    <div className="student-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Financial Dashboard</h2>
          <p className="text-muted">Manage your educational fees, dues, and payment history</p>
        </div>
      </div>

      {/* Row 1: The Golden Feature & Smart Insight */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'minmax(300px, 1fr) 2fr' }}>
        <div className="module-card flex-col" style={{ background: '#fff0f0', border: '1px solid #ffe5e5', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
           <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.8rem' }}>
             <AlertCircle size={24} color="#FF3B30" />
           </div>
           <p style={{ margin: 0, fontWeight: 600, color: '#FF3B30', textTransform: 'uppercase', fontSize: '0.85rem' }}>Immediate Action Required</p>
           <h3 style={{ fontSize: '2.5rem', margin: '0.5rem 0', color: '#FF3B30' }}>₹30,000</h3>
           <p style={{ margin: '0 0 1rem', color: '#FF3B30', fontWeight: 500 }}>Due strictly in 5 days (Nov 15)</p>
           <button className="btn btn-primary" style={{ width: '100%', background: '#FF3B30', color: 'white', border: 'none' }}><CreditCard size={18}/> Pay Now</button>
        </div>

        <div className="module-card" style={{ background: '#f5f5f7', borderLeft: '4px solid #007AFF', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="flex-start" style={{ marginBottom: '1rem' }}>
            <TrendingDown size={24} color="#007AFF" />
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1d1d1f' }}>Learning Assistant Insight</h3>
          </div>
          <p style={{ margin: 0, color: '#1d1d1f', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500 }}>
            "It's great that your tuition is all caught up! I did notice a slight dip in your academic performance recently, though (-4.2%). It seems like missing a few core classes might be the culprit. Let's try to get that attendance back up so you can keep succeeding! You've got this."
          </p>
        </div>
      </div>

      {/* Row 2: Top Level Ledger */}
      <div className="module-card" style={{ padding: '1.5rem', paddingBottom: '2.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Annual Fee Overview</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <div>
             <p className="text-muted" style={{ margin: '0 0 4px', fontSize: '0.85rem' }}>Total Program Fee</p>
             <h3 style={{ margin: 0, fontSize: '1.8rem' }}>₹1,00,000</h3>
          </div>
          <div>
             <p className="text-muted flex-start" style={{ margin: '0 0 4px', fontSize: '0.85rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34C759', marginRight: '6px' }}></div> Amount Paid</p>
             <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#34C759' }}>₹70,000</h3>
          </div>
          <div>
             <p className="text-muted flex-start" style={{ margin: '0 0 4px', fontSize: '0.85rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF3B30', marginRight: '6px' }}></div> Pending Amount</p>
             <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#FF3B30' }}>₹30,000</h3>
          </div>
          <div>
             <p className="text-muted" style={{ margin: '0 0 4px', fontSize: '0.85rem' }}>Next Installment</p>
             <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Nov 15</h3>
          </div>
        </div>

        {/* Payment Progress Visual Bar */}
        <div>
          <div className="flex-between" style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: 600 }}>Total Fees Cleared</span>
            <span className="text-green" style={{ fontWeight: 600 }}>70%</span>
          </div>
          <div className="progress-container" style={{ margin: 0, height: '12px' }}>
            <div className="progress-fill success" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>

      {/* Row 3: Structure Breakdown & Installments */}
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="module-card">
           <div className="flex-start" style={{ marginBottom: '1rem' }}>
             <PieChartIcon size={20} className="text-blue" />
             <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Detailed Fee Structure</h3>
           </div>
           <div style={{ height: '240px', width: '100%' }}>
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={feeStructureData}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {feeStructureData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip 
                   formatter={(value) => `₹${value.toLocaleString()}`}
                   contentStyle={{ borderRadius: '8px', border: '1px solid #d2d2d7', background: '#ffffff', color: '#1d1d1f' }}
                 />
                 <Legend verticalAlign="bottom" height={36} iconType="circle" />
               </PieChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="module-card">
           <div className="flex-start" style={{ marginBottom: '1rem' }}>
             <Calendar size={20} className="text-indigo" />
             <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Installment Schedule</h3>
           </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
             <div className="flex-between" style={{ padding: '1rem', background: '#f5f5f7', borderRadius: '8px', borderLeft: '4px solid #34C759', border: '1px solid rgba(0,0,0,0.05)' }}>
               <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>Semester 1 (Phase 1)</p>
                  <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>Due: Jul 15, 2024</p>
               </div>
               <div style={{ textAlign: 'right' }}>
                 <p style={{ margin: 0, fontWeight: 600, fontSize: '1.1rem' }}>₹50,000</p>
                 <span className="badge success" style={{ marginTop: '4px' }}>Paid</span>
               </div>
             </div>
             
             <div className="flex-between" style={{ padding: '1rem', background: '#f5f5f7', borderRadius: '8px', borderLeft: '4px solid #34C759', border: '1px solid rgba(0,0,0,0.05)' }}>
               <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>Semester 1 (Phase 2)</p>
                  <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>Due: Oct 01, 2024</p>
               </div>
               <div style={{ textAlign: 'right' }}>
                 <p style={{ margin: 0, fontWeight: 600, fontSize: '1.1rem' }}>₹20,000</p>
                 <span className="badge success" style={{ marginTop: '4px' }}>Paid</span>
               </div>
             </div>

             <div className="flex-between" style={{ padding: '1rem', background: '#fff0f0', borderRadius: '8px', borderLeft: '4px solid #FF3B30', border: '1px solid #ffe5e5' }}>
               <div>
                  <p style={{ margin: 0, fontWeight: 600, color: '#FF3B30' }}>Semester 2 (Advance)</p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#FF3B30' }}>Due: Nov 15, 2024</p>
               </div>
               <div style={{ textAlign: 'right' }}>
                 <p style={{ margin: 0, fontWeight: 600, fontSize: '1.1rem', color: '#FF3B30' }}>₹30,000</p>
                 <span className="badge critical" style={{ marginTop: '4px' }}>Pending</span>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Row 4: Transaction History & Receipts */}
      <div className="module-card">
        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <div className="flex-start">
             <Wallet size={20} className="text-blue" />
             <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Transaction History & Official Receipts</h3>
          </div>
        </div>
        
        <table className="data-table" style={{ marginTop: 0 }}>
          <thead>
            <tr>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem' }}>Transaction Description</th>
              <th style={{ padding: '1rem' }}>Method</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Amount</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Receipt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '1rem', fontWeight: 500 }}>Oct 01, 2024</td>
              <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Academic Phase 2 Payment</td>
              <td style={{ padding: '1rem' }}>UPI</td>
              <td style={{ padding: '1rem' }}><span className="badge success">Paid</span></td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, fontFamily: 'monospace', fontSize: '1.05rem' }}>₹20,000</td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>
                <button className="btn btn-outline flex-center" style={{ padding: '6px 12px', fontSize: '0.85rem', margin: '0 auto' }}>
                  <FileText size={14} style={{ marginRight: '6px' }}/> PDF
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '1rem', fontWeight: 500 }}>Jul 15, 2024</td>
              <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Semester 1 Initial Deposit</td>
              <td style={{ padding: '1rem' }}>Credit Card</td>
              <td style={{ padding: '1rem' }}><span className="badge success">Paid</span></td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, fontFamily: 'monospace', fontSize: '1.05rem' }}>₹50,000</td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>
                <button className="btn btn-outline flex-center" style={{ padding: '6px 12px', fontSize: '0.85rem', margin: '0 auto' }}>
                  <FileText size={14} style={{ marginRight: '6px' }}/> PDF
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};
export default FeesManagement;

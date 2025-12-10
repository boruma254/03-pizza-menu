import React from 'react';
import { getAllOrders } from './apiClient';

function toCSV(rows) {
  if (!rows || rows.length === 0) return '';
  const keys = Object.keys(rows[0]);
  const header = keys.join(',');
  const lines = rows.map(r => keys.map(k => JSON.stringify(r[k] ?? '')).join(','));
  return [header, ...lines].join('\n');
}

export default function AdminPage() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const o = await getAllOrders();
        if (mounted) {
          setOrders(o || []);
        }
      } catch (err) {
        console.error('Failed to load orders:', err);
      }
      setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="admin-page">
      <h2>Admin — Orders</h2>
      {loading ? <p>Loading...</p> : (
        <section>
          <h3>Orders ({orders.length})</h3>
          <button onClick={() => {
            const csv = toCSV(orders);
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'orders.csv'; a.click();
            URL.revokeObjectURL(url);
          }}>Export Orders CSV</button>
          <div className="admin-list">
            {orders.slice(0, 50).map(o => (
              <div key={o._id} className="admin-row">
                <strong>Order {o._id}</strong>
                <div className="muted">${o.total} — Status: {o.status}</div>
                {o.userId?.email && <div className="muted">User: {o.userId.email}</div>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

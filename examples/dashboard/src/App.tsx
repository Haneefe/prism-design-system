import { useState } from 'react';
import { 
  Stack, 
  Flex, 
  Text, 
  useTheme, 
  useBreakpoint 
} from '@prism/core';
import { 
  Button, 
  Card, 
  Input, 
  Modal, 
  ToastProvider, 
  useToast 
} from '@prism/components';

// Sample data
const stats = [
  { label: 'Total Users', value: '12,345', change: '+12%' },
  { label: 'Revenue', value: '$45,678', change: '+8%' },
  { label: 'Orders', value: '1,234', change: '+23%' },
  { label: 'Conversion', value: '3.2%', change: '-2%' },
];

const recentOrders = [
  { id: '1', customer: 'John Doe', amount: '$199.99', status: 'Completed' },
  { id: '2', customer: 'Jane Smith', amount: '$299.99', status: 'Processing' },
  { id: '3', customer: 'Bob Johnson', amount: '$99.99', status: 'Shipped' },
  { id: '4', customer: 'Alice Brown', amount: '$399.99', status: 'Pending' },
];

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Card padding="md">
      <Flex justify="space-between" align="center">
        <Text variant="h2" color="primary">
          Dashboard
        </Text>
        <Flex gap={3} align="center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌙' : '☀️'} 
            {theme === 'light' ? 'Dark' : 'Light'}
          </Button>
          <Button variant="primary">
            New Order
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

const StatsGrid = () => {
  const { isAbove } = useBreakpoint();
  const isDesktop = isAbove('lg');
  
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : isAbove('md') ? 'repeat(2, 1fr)' : '1fr',
      gap: 'var(--prism-spacing-4)' 
    }}>
      {stats.map((stat, index) => (
        <Card key={index} padding="md">
          <Stack gap={2}>
            <Text variant="caption" color="secondary">
              {stat.label}
            </Text>
            <Text variant="h3" color="primary">
              {stat.value}
            </Text>
            <Text 
              variant="caption" 
              color={stat.change.startsWith('+') ? 'primary' : 'secondary'}
            >
              {stat.change}
            </Text>
          </Stack>
        </Card>
      ))}
    </div>
  );
};

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  
  const filteredOrders = recentOrders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Card padding="none">
      <Stack gap={0}>
        <div style={{ padding: 'var(--prism-spacing-4)' }}>
          <Flex justify="space-between" align="center" gap={4}>
            <Text variant="h4" color="primary">
              Recent Orders
            </Text>
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="sm"
              leftIcon="🔍"
            />
          </Flex>
        </div>
        
        <div style={{ 
          overflowX: 'auto',
          borderTop: '1px solid var(--prism-color-border-primary)' 
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: 'var(--prism-fontSize-sm)'
          }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--prism-color-background-secondary)' }}>
                <th style={{ 
                  padding: 'var(--prism-spacing-3) var(--prism-spacing-4)', 
                  textAlign: 'left',
                  fontWeight: 'var(--prism-fontWeight-semibold)',
                  color: 'var(--prism-color-text-secondary)'
                }}>
                  Customer
                </th>
                <th style={{ 
                  padding: 'var(--prism-spacing-3) var(--prism-spacing-4)', 
                  textAlign: 'left',
                  fontWeight: 'var(--prism-fontWeight-semibold)',
                  color: 'var(--prism-color-text-secondary)'
                }}>
                  Amount
                </th>
                <th style={{ 
                  padding: 'var(--prism-spacing-3) var(--prism-spacing-4)', 
                  textAlign: 'left',
                  fontWeight: 'var(--prism-fontWeight-semibold)',
                  color: 'var(--prism-color-text-secondary)'
                }}>
                  Status
                </th>
                <th style={{ 
                  padding: 'var(--prism-spacing-3) var(--prism-spacing-4)', 
                  textAlign: 'right',
                  fontWeight: 'var(--prism-fontWeight-semibold)',
                  color: 'var(--prism-color-text-secondary)'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id}
                  style={{ 
                    borderBottom: '1px solid var(--prism-color-border-primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--prism-color-background-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                  }}
                >
                  <td style={{ 
                    padding: 'var(--prism-spacing-3) var(--prism-spacing-4)',
                    color: 'var(--prism-color-text-primary)'
                  }}>
                    {order.customer}
                  </td>
                  <td style={{ 
                    padding: 'var(--prism-spacing-3) var(--prism-spacing-4)',
                    color: 'var(--prism-color-text-primary)',
                    fontWeight: 'var(--prism-fontWeight-medium)'
                  }}>
                    {order.amount}
                  </td>
                  <td style={{ 
                    padding: 'var(--prism-spacing-3) var(--prism-spacing-4)' 
                  }}>
                    <span style={{
                      padding: 'var(--prism-spacing-1) var(--prism-spacing-2)',
                      borderRadius: 'var(--prism-radius-sm)',
                      fontSize: 'var(--prism-fontSize-xs)',
                      fontWeight: 'var(--prism-fontWeight-medium)',
                      backgroundColor: order.status === 'Completed' ? 'var(--prism-color-success-100)' :
                                     order.status === 'Processing' ? 'var(--prism-color-warning-100)' :
                                     order.status === 'Shipped' ? 'var(--prism-color-primary-100)' :
                                     'var(--prism-color-neutral-100)',
                      color: order.status === 'Completed' ? 'var(--prism-color-success-800)' :
                            order.status === 'Processing' ? 'var(--prism-color-warning-800)' :
                            order.status === 'Shipped' ? 'var(--prism-color-primary-800)' :
                            'var(--prism-color-neutral-800)'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ 
                    padding: 'var(--prism-spacing-3) var(--prism-spacing-4)',
                    textAlign: 'right'
                  }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedOrder(order.id)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Stack>
      
      <Modal
        open={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
        title="Order Details"
        size="md"
      >
        {selectedOrder && (
          <Stack gap={4}>
            <Text>
              Order ID: {selectedOrder}
            </Text>
            <Text>
              This is a sample modal demonstrating the Modal component with focus trap and animations.
            </Text>
            <Flex gap={3} justify="end">
              <Button 
                variant="secondary"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </Button>
              <Button variant="primary">
                Edit Order
              </Button>
            </Flex>
          </Stack>
        )}
      </Modal>
    </Card>
  );
};

const QuickActions = () => {
  const { addToast } = useToast();
  
  const showToast = (type: 'success' | 'warning' | 'error' | 'info') => {
    addToast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Toast`,
      message: `This is a ${type} notification with auto-dismiss.`,
      variant: type,
      duration: 5000,
    });
  };
  
  return (
    <Card padding="md">
      <Stack gap={4}>
        <Text variant="h4" color="primary">
          Quick Actions
        </Text>
        <Stack gap={3}>
          <Button 
            variant="primary" 
            fullWidth
            onClick={() => showToast('success')}
          >
            Show Success Toast
          </Button>
          <Button 
            variant="secondary" 
            fullWidth
            onClick={() => showToast('warning')}
          >
            Show Warning Toast
          </Button>
          <Button 
            variant="ghost" 
            fullWidth
            onClick={() => showToast('error')}
          >
            Show Error Toast
          </Button>
          <Button 
            variant="destructive" 
            fullWidth
            onClick={() => showToast('info')}
          >
            Show Info Toast
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

const Dashboard = () => {
  const { isAbove } = useBreakpoint();
  const isDesktop = isAbove('lg');
  
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: 'var(--prism-color-background-secondary)',
      padding: 'var(--prism-spacing-4)'
    }}>
      <Stack gap={6} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Header />
        
        <StatsGrid />
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? '1fr 300px' : '1fr',
          gap: 'var(--prism-spacing-6)',
          alignItems: 'start'
        }}>
          <OrdersTable />
          <QuickActions />
        </div>
      </Stack>
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <Dashboard />
    </ToastProvider>
  );
}

export default App;
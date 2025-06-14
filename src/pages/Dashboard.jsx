import { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useWebSocket } from '../hooks/useWebSocket';
import { showInfoToast } from '../utils/notifications';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock data for KPIs
const kpiData = {
  revenue: {
    current: 45678,
    previous: 38900,
    change: '+17.4%',
    trend: 'up',
  },
  users: {
    current: 2543,
    previous: 2100,
    change: '+21.1%',
    trend: 'up',
  },
  sales: {
    current: 1234,
    previous: 1000,
    change: '+23.4%',
    trend: 'up',
  },
  conversion: {
    current: '3.2%',
    previous: '2.8%',
    change: '+14.3%',
    trend: 'up',
  },
};

// Enhanced revenue data with multiple datasets
const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.1)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Target',
      data: [15000, 15000, 15000, 15000, 15000, 15000],
      borderColor: 'rgba(255, 99, 132, 0.5)',
      borderDash: [5, 5],
      fill: false,
    },
  ],
};

// Enhanced user activity data with multiple metrics
const userActivityData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'New Signups',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1,
    },
    {
      label: 'Active Users',
      data: [120, 150, 180, 190, 160, 140, 130],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 1,
    },
  ],
};

// Enhanced sales distribution data
const salesDistributionData = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D'],
  datasets: [
    {
      data: [300, 150, 100, 50],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

// New monthly usage data for area chart
const monthlyUsageData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'API Calls',
      data: [1200, 1900, 1500, 2500],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgb(153, 102, 255)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Storage Used',
      data: [800, 1200, 1000, 1500],
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgb(255, 159, 64)',
      tension: 0.4,
      fill: true,
    },
  ],
};

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    type: 'user',
    action: 'New user registered',
    user: 'John Doe',
    time: '2 minutes ago',
    icon: '👤',
  },
  {
    id: 2,
    type: 'sale',
    action: 'New sale completed',
    amount: '$1,234',
    time: '15 minutes ago',
    icon: '💰',
  },
  {
    id: 3,
    type: 'system',
    action: 'System update completed',
    time: '1 hour ago',
    icon: '🔄',
  },
  {
    id: 4,
    type: 'alert',
    action: 'High traffic alert',
    time: '2 hours ago',
    icon: '⚠️',
  },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedChart, setSelectedChart] = useState('revenue');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    newSubscriptions: 0,
  });

  const handleWebSocketMessage = (data) => {
    if (data.type === 'stats_update') {
      setStats(prevStats => ({
        ...prevStats,
        ...data.data,
      }));
      showInfoToast('Dashboard updated with latest data');
    }
  };

  const { isConnected } = useWebSocket('dashboard', handleWebSocketMessage);

  const chartOptions = {
    revenue: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `$${value.toLocaleString()}`,
          },
        },
      },
    },
    users: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 20,
          },
        },
      },
    },
    sales: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
    usage: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="input-field w-48"
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Connection Status */}
      <div className="mt-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          isConnected 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(kpiData).map(([key, data]) => (
          <div key={key} className="card">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500 capitalize">
                {key}
              </h3>
              <span
                className={`text-sm font-medium ${
                  data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {data.change}
              </span>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-semibold text-gray-900">
                {typeof data.current === 'number'
                  ? data.current.toLocaleString()
                  : data.current}
              </p>
              <p className="text-sm text-gray-500">
                vs {typeof data.previous === 'number'
                  ? data.previous.toLocaleString()
                  : data.previous}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Users */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Users</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">{stats.totalUsers}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Users</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">{stats.activeUsers}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Revenue</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">${stats.totalRevenue.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* New Subscriptions */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">New Subscriptions</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">{stats.newSubscriptions}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Revenue Overview</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedChart('revenue')}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedChart === 'revenue'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setSelectedChart('usage')}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedChart === 'usage'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Usage
              </button>
            </div>
          </div>
          {selectedChart === 'revenue' ? (
            <Line data={revenueData} options={chartOptions.revenue} />
          ) : (
            <Line data={monthlyUsageData} options={chartOptions.usage} />
          )}
        </div>
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Activity</h3>
          <Bar data={userActivityData} options={chartOptions.users} />
        </div>
      </div>

      {/* Sales Distribution and Recent Activity */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="card lg:col-span-1">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Distribution</h3>
          <div className="h-64">
            <Doughnut
              data={salesDistributionData}
              options={chartOptions.sales}
            />
          </div>
        </div>
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, index) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {index !== recentActivity.length - 1 && (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                          {activity.icon}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {activity.action}
                            {activity.user && (
                              <span className="font-medium text-gray-900">
                                {' '}
                                {activity.user}
                              </span>
                            )}
                            {activity.amount && (
                              <span className="font-medium text-gray-900">
                                {' '}
                                {activity.amount}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime={activity.time}>{activity.time}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 
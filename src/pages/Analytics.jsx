import { Doughnut, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const userDistributionData = {
  labels: ['Free', 'Basic', 'Pro', 'Enterprise'],
  datasets: [
    {
      data: [300, 150, 100, 50],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
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

const userActivityData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Active Users',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
  ],
};

const metrics = [
  { name: 'Total Revenue', value: '$45,231', change: '+20.1%' },
  { name: 'Active Users', value: '2,543', change: '+15.3%' },
  { name: 'Conversion Rate', value: '3.2%', change: '+4.1%' },
  { name: 'Avg. Session', value: '2m 45s', change: '+12.5%' },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="card">
            <dt className="text-sm font-medium text-gray-500 truncate">
              {metric.name}
            </dt>
            <dd className="mt-1 flex items-baseline justify-between">
              <div className="text-2xl font-semibold text-gray-900">
                {metric.value}
              </div>
              <div className="text-sm font-medium text-green-600">
                {metric.change}
              </div>
            </dd>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
          <Line data={revenueData} />
        </div>
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Activity</h3>
          <Bar data={userActivityData} />
        </div>
      </div>

      {/* User Distribution */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">User Distribution by Plan</h3>
        <div className="h-80">
          <Doughnut data={userDistributionData} />
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Features</h3>
          <div className="space-y-4">
            {[
              { name: 'Dashboard', usage: '85%' },
              { name: 'Reports', usage: '72%' },
              { name: 'Analytics', usage: '68%' },
              { name: 'Settings', usage: '45%' },
            ].map((feature) => (
              <div key={feature.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{feature.name}</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full"
                    style={{ width: feature.usage }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{feature.usage}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Engagement</h3>
          <div className="space-y-4">
            {[
              { name: 'Daily Active Users', value: '1,234' },
              { name: 'Weekly Active Users', value: '3,456' },
              { name: 'Monthly Active Users', value: '5,678' },
              { name: 'Avg. Time on Site', value: '4m 32s' },
            ].map((metric) => (
              <div key={metric.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{metric.name}</span>
                <span className="text-sm font-medium text-gray-900">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
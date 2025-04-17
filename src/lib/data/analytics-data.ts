import { DataPoint } from '@/components/dashboard/mini-chart';

// Helper to generate random data for charts
function generateRandomData(days: number, min: number, max: number, trend: 'up' | 'down' | 'stable'): DataPoint[] {
  const data: DataPoint[] = [];
  let lastValue = Math.floor(Math.random() * (max - min) + min);

  for (let i = 0; i < days; i++) {
    // Generate value based on trend
    let change = 0;
    if (trend === 'up') {
      change = Math.floor(Math.random() * 10) - 3; // More likely to go up
    } else if (trend === 'down') {
      change = Math.floor(Math.random() * 10) - 7; // More likely to go down
    } else {
      change = Math.floor(Math.random() * 6) - 3; // Equally likely to go up or down
    }

    // Apply change and keep within bounds
    lastValue = Math.max(min, Math.min(max, lastValue + change));
    
    // Add data point
    data.push({
      name: i === 0 ? 'Start' : i === days - 1 ? 'Now' : '',
      value: lastValue
    });
  }

  return data;
}

// Mock analytics data for Instagram
export const instagramData = {
  followers: {
    current: 2482,
    change: 14.2,
    data: generateRandomData(14, 2300, 2500, 'up'),
  },
  engagementRate: {
    current: 5.2,
    change: 0.8,
    data: generateRandomData(14, 45, 55, 'up'),
  },
  reach: {
    current: 12400,
    change: 22,
    data: generateRandomData(14, 10000, 13000, 'up'),
  },
  topContent: [
    {
      title: "Summer collection showcase",
      engagement: "324 likes, 42 comments",
      reach: "2.4K",
      change: 15.8
    },
    {
      title: "Customer testimonial video",
      engagement: "287 likes, 36 comments",
      reach: "1.9K",
      change: 12.3
    },
    {
      title: "Behind the scenes at workshop",
      engagement: "256 likes, 28 comments",
      reach: "1.7K",
      change: 8.5
    }
  ],
  demographics: {
    age: [
      { group: "18-24", percentage: 32 },
      { group: "25-34", percentage: 45 },
      { group: "35-44", percentage: 15 },
      { group: "45+", percentage: 8 }
    ],
    gender: [
      { group: "Female", percentage: 68 },
      { group: "Male", percentage: 31 },
      { group: "Other", percentage: 1 }
    ],
    location: [
      { place: "Hong Kong", percentage: 72 },
      { place: "Singapore", percentage: 12 },
      { place: "Taiwan", percentage: 8 },
      { place: "Other", percentage: 8 }
    ]
  },
  postFrequency: [
    { day: "Mon", count: 2 },
    { day: "Tue", count: 1 },
    { day: "Wed", count: 3 },
    { day: "Thu", count: 1 },
    { day: "Fri", count: 2 },
    { day: "Sat", count: 0 },
    { day: "Sun", count: 1 }
  ]
};

// Mock analytics data for Threads
export const threadsData = {
  followers: {
    current: 1247,
    change: 28.5,
    data: generateRandomData(14, 1100, 1300, 'up'),
  },
  engagementRate: {
    current: 7.8,
    change: 1.2,
    data: generateRandomData(14, 65, 80, 'up'),
  },
  reach: {
    current: 9800,
    change: 34,
    data: generateRandomData(14, 8000, 10000, 'up'),
  },
  topContent: [
    {
      title: "Industry insights thread",
      engagement: "145 likes, 32 reposts",
      reach: "1.8K",
      change: 22.7
    },
    {
      title: "Q&A with founder",
      engagement: "112 likes, 28 reposts",
      reach: "1.5K",
      change: 18.4
    },
    {
      title: "Product announcement",
      engagement: "98 likes, 24 reposts",
      reach: "1.2K",
      change: 14.2
    }
  ],
  demographics: {
    age: [
      { group: "18-24", percentage: 38 },
      { group: "25-34", percentage: 42 },
      { group: "35-44", percentage: 12 },
      { group: "45+", percentage: 8 }
    ],
    gender: [
      { group: "Female", percentage: 64 },
      { group: "Male", percentage: 35 },
      { group: "Other", percentage: 1 }
    ],
    location: [
      { place: "Hong Kong", percentage: 68 },
      { place: "Singapore", percentage: 14 },
      { place: "Taiwan", percentage: 10 },
      { place: "Other", percentage: 8 }
    ]
  },
  postFrequency: [
    { day: "Mon", count: 1 },
    { day: "Tue", count: 2 },
    { day: "Wed", count: 1 },
    { day: "Thu", count: 3 },
    { day: "Fri", count: 2 },
    { day: "Sat", count: 1 },
    { day: "Sun", count: 0 }
  ]
}; 
/**
 * This Mock API intercepts failed backend requests when deployed to Vercel without a backend.
 * It provides identical data structures to the real FastAPI backend, ensuring the demo works
 * flawlessly for interviewers and placements!
 */

export const MOCK_USERS = {
  'admin@uniinsight.edu': { id: 1, full_name: 'Admin User', role: 'admin' },
  'sarah.dsouza@uniinsight.edu': { id: 2, full_name: "Prof. Sarah D'Souza", role: 'teacher' },
  'student1@uniinsight.edu': { id: 3, full_name: 'Student 1', role: 'student' },
  'parent@demo.edu': { id: 4, full_name: 'Parent User', role: 'parent' }
};

export const MOCK_LEADERBOARD = [
  { id: 45, name: 'Alex Chen', score: 980, rank: 1, is_current_user: false },
  { id: 22, name: 'Sarah Miller', score: 945, rank: 2, is_current_user: false },
  { id: 18, name: 'James Wilson', score: 920, rank: 3, is_current_user: false },
  { id: 9, name: 'Liam Johnson', score: 905, rank: 4, is_current_user: false },
  { id: 3, name: 'Student 1', score: 850, rank: 14, is_current_user: true },
  { id: 11, name: 'Noah Williams', score: 650, rank: 85, is_current_user: false },
];

export const MOCK_DASHBOARD = {
  attendance: 78.5,
  assignments: 8.5,
  midterm_marks: 85.0,
  participation: 90.0,
  risk_category: 'Safe',
  score: 850,
  rank: 14,
  total_students: 120
};

export const mockFetch = async (endpoint, options = {}) => {
  console.warn(`[OFFLINE DEMO MODE] Intercepting request to: ${endpoint}`);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(600); // Simulate network latency for realism

  const createResponse = (data, status = 200) => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => data
  });

  // Login Mock
  if (endpoint.includes('/auth/login/access-token')) {
    const email = options.body ? options.body.get('username') : 'student1@uniinsight.edu';
    localStorage.setItem('mock_demo_email', email);
    return createResponse({ access_token: 'mock_access_token', refresh_token: 'mock_refresh_token', token_type: 'bearer' });
  }

  // Current User Mock
  if (endpoint.includes('/users/me')) {
    const email = localStorage.getItem('mock_demo_email') || 'student1@uniinsight.edu';
    const mockUser = MOCK_USERS[email] || MOCK_USERS['student1@uniinsight.edu'];
    return createResponse(mockUser);
  }

  // Student Leaderboard
  if (endpoint.includes('/students/leaderboard')) {
    return createResponse({
      leaderboard: MOCK_LEADERBOARD,
      current_user_rank: MOCK_LEADERBOARD[4]
    });
  }

  // Student Dashboard
  if (endpoint.includes('/students/me/dashboard')) {
    return createResponse(MOCK_DASHBOARD);
  }

  // Fallback empty response for AI routes
  return createResponse({ message: "Mock response generated" });
};

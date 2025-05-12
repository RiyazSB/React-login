// components/Dashboard.js
import { useContext } from 'react';
import './Dashboard.css';
import { AuthContext } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome back, {currentUser?.displayName || 'User'}!</h1>
        <p className="welcome-text">Here's what's happening today</p>
      </header>

      <div className="dashboard-grid">
        {/* Stats Cards */}
        <div className="dashboard-card">
          <h3>Your Progress</h3>
          <div className="stat-value">78%</div>
          <p className="stat-label">Course Completion</p>
        </div>

        <div className="dashboard-card">
          <h3>Active Courses</h3>
          <div className="stat-value">3</div>
          <p className="stat-label">Currently Enrolled</p>
        </div>

        <div className="dashboard-card">
          <h3>Upcoming</h3>
          <div className="stat-value">2</div>
          <p className="stat-label">New Lessons Tomorrow</p>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card wide-card">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            <li>Completed "Advanced React Patterns" lesson</li>
            <li>Started "Authentication Best Practices" course</li>
            <li>Earned "Fast Learner" badge</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <h3>Quick Actions</h3>
          <button className="action-button">Continue Learning</button>
          <button className="action-button">Explore Courses</button>
          <button className="action-button">Update Profile</button>
        </div>
      </div>
    </div>
  );
}
/**
 * UniInsight AI Service
 * Connects the React Frontend to the Python Scikit-Learn Engine
 */

import { apiFetch } from '../utils/api';

export const aiService = {
  /**
   * Status check for the Python server
   */
  async checkStatus() {
    try {
      const response = await apiFetch('/');
      return await response.json();
    } catch (error) {
      console.error('AI Engine Offline:', error);
      return { status: 'Offline' };
    }
  },

  /**
   * Get comprehensive AI analysis for a student
   * @param {number[]} features - [attendance, assignment_completion, midterm_marks, participation]
   */
  async predictAll(features) {
    try {
      const response = await apiFetch(`/ml/predict_all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }),
      });
      
      if (!response.ok) throw new Error('Prediction failed');
      return await response.json();
    } catch (error) {
      console.error('AI Prediction Error:', error);
      // Fallback to basic logic if server is down
      return this._getFallbackPrediction(features);
    }
  },

  /**
   * Fetch advanced predictive analytics from the backend
   * @param {Object} data - Contains attendance, assignment_completion, midterm_marks, etc.
   */
  async fetchPredictiveAnalytics(data) {
    try {
      const response = await apiFetch(`/ml/predictive/analytics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to fetch predictive analytics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching predictive analytics:', error);
      return this._getFallbackPredictiveAnalytics(data);
    }
  },

  /**
   * Fetch relational SQL schema and mock table data
   */
  async fetchSqlSchemaData() {
    try {
      const response = await apiFetch(`/ml/predictive/sql_schema`);
      if (!response.ok) throw new Error('Failed to fetch SQL schema data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching SQL schema data:', error);
      return this._getFallbackSqlSchemaData();
    }
  },

  /**
   * Fallback logic to show during presentation if the Python server isn't started
   */
  _getFallbackPrediction(features) {
    const [attendance, assignments, marks, participation] = features;
    let category = 'Good';
    if (attendance < 60 || marks < 50) category = 'At Risk';
    else if (attendance < 75 || marks < 65) category = 'Average';

    return {
      predicted_score: Math.round((attendance * 0.4) + (marks * 0.6)),
      risk_category: category,
      cluster: { id: -1, description: "Cluster: Offline Fallback" },
      insights: ["Using fallback offline rules. Please start the Python SciKit-Learn server for accurate predictions."],
      metadata: { algorithm: "Rule-based (Fallback)" }
    };
  },

  _getFallbackPredictiveAnalytics(req) {
    const proj_weight = req.project_completion * 10 || 0;
    const placement_prob = Math.max(5.0, Math.min(99.0, Math.round(
      (req.technical_skills || 0) * 0.25 +
      (req.coding_activity || 0) * 0.25 +
      (req.attendance || 0) * 0.15 +
      (req.communication || 0) * 0.15 +
      proj_weight * 0.10 +
      (req.aptitude || 0) * 0.10
    )));

    const dbms_pred = Math.max(20, Math.min(100, Math.round((req.midterm_marks || 0) * 0.8 + (req.attendance || 0) * 0.1 + (req.participation || 0) * 0.5)));
    const dsa_pred = Math.max(20, Math.min(100, Math.round((req.coding_activity || 0) * 0.75 + (req.technical_skills || 0) * 0.15 + (req.participation || 0) * 0.5)));
    const quant_pred = Math.max(20, Math.min(100, Math.round((req.aptitude || 0) * 0.8 + (req.midterm_marks || 0) * 0.2)));

    let attendance_risk = 0;
    if (req.attendance < 75) {
      attendance_risk = Math.round(Math.max(0, Math.min(100, (75 - req.attendance) * 4.5)));
    }

    let behavior_flag = "Stable Growth";
    if (req.attendance >= 85 && req.coding_activity >= 85 && req.technical_skills >= 80) {
      behavior_flag = "Active Outperformer";
    } else if (req.attendance < 70 && req.assignment_completion < 60) {
      behavior_flag = "High Risk";
    } else if (req.coding_activity < 50 && req.midterm_marks < 60) {
      behavior_flag = "Burnout Risk";
    } else if (req.participation < 4 && req.attendance >= 80) {
      behavior_flag = "Passive Learner";
    }

    const maang_ready = Math.max(10, Math.min(100, Math.round((req.technical_skills || 0) * 0.6 + (req.coding_activity || 0) * 0.4)));
    const fintech_ready = Math.max(10, Math.min(100, Math.round((req.technical_skills || 0) * 0.4 + (req.aptitude || 0) * 0.4 + (req.communication || 0) * 0.2)));
    const consultancy_ready = Math.max(10, Math.min(100, Math.round((req.communication || 0) * 0.5 + (req.technical_skills || 0) * 0.3 + (req.aptitude || 0) * 0.2)));

    const confidence_score = Math.max(80, Math.min(98.5, Math.round(95.0 - (100.0 - req.attendance) * 0.15)));

    return {
      predicted_score: Math.round(((req.attendance || 0) * 0.4) + ((req.midterm_marks || 0) * 0.6)),
      risk_category: req.attendance < 60 || req.midterm_marks < 50 ? 'At Risk' : (req.attendance < 75 || req.midterm_marks < 65 ? 'Average' : 'Good'),
      cluster: { id: 1, description: "Active Learner Cluster (Offline Fallback)" },
      placement_probability: placement_prob,
      attendance_shortage_risk: attendance_risk,
      behavior_flag: behavior_flag,
      confidence_score: confidence_score,
      subject_forecasts: {
        dbms: dbms_pred,
        dsa: dsa_pred,
        quantitative: quant_pred
      },
      company_readiness: {
        maang: maang_ready,
        fintech: fintech_ready,
        consultancy: consultancy_ready
      },
      insights: [
        "Running in local fallback mode. Start the uvicorn API server to connect dynamically.",
        req.attendance < 75 ? `⚠️ Attendance is low: generating an attendance risk warning.` : `🟢 Attendance is stable at ${req.attendance}%.`
      ]
    };
  },

  _getFallbackSqlSchemaData() {
    return {
      "schemas": {
        "students": "CREATE TABLE students (\n  id INT PRIMARY KEY,\n  name VARCHAR(100),\n  email VARCHAR(100),\n  dept VARCHAR(50),\n  cohort_year INT\n);\nCREATE INDEX idx_student_dept ON students(dept);",
        "attendance": "CREATE TABLE attendance_logs (\n  id INT PRIMARY KEY,\n  student_id INT REFERENCES students(id),\n  date DATE,\n  status VARCHAR(10),\n  hours_present INT\n);\nCREATE INDEX idx_att_student ON attendance_logs(student_id);",
        "marks": "CREATE TABLE marks_records (\n  id INT PRIMARY KEY,\n  student_id INT REFERENCES students(id),\n  subject VARCHAR(50),\n  internal_marks INT,\n  external_marks INT,\n  exam_date DATE\n);\nCREATE INDEX idx_marks_student ON marks_records(student_id);",
        "placements": "CREATE TABLE placement_metrics (\n  id INT PRIMARY KEY,\n  student_id INT REFERENCES students(id),\n  technical_score INT,\n  coding_activity_score INT,\n  communication_score INT,\n  projects_completed INT,\n  aptitude_score INT,\n  readiness_probability DECIMAL(5,2)\n);",
        "fees": "CREATE TABLE fee_transactions (\n  id INT PRIMARY KEY,\n  student_id INT REFERENCES students(id),\n  amount_due DECIMAL(10,2),\n  amount_paid DECIMAL(10,2),\n  payment_status VARCHAR(20),\n  transaction_date TIMESTAMP\n);\nCREATE INDEX idx_fees_student ON fee_transactions(student_id);"
      },
      "optimized_joins": {
        "student_readiness": "SELECT \n  s.id, \n  s.name, \n  s.dept, \n  p.readiness_probability,\n  AVG(m.internal_marks + m.external_marks) as avg_marks \nFROM students s \nJOIN placement_metrics p ON s.id = p.student_id \nJOIN marks_records m ON s.id = m.student_id \nWHERE p.readiness_probability > 75.00 \nGROUP BY s.id, s.name, s.dept, p.readiness_probability\nORDER BY avg_marks DESC;",
        "fee_risk_correlation": "SELECT \n  s.id, \n  s.name, \n  f.amount_due, \n  f.payment_status,\n  a.avg_attendance\nFROM students s \nJOIN fee_transactions f ON s.id = f.student_id \nJOIN (\n  SELECT student_id, AVG(hours_present * 12.5) as avg_attendance \n  FROM attendance_logs \n  GROUP BY student_id\n) a ON s.id = a.student_id \nWHERE f.payment_status = 'Pending' AND a.avg_attendance < 75.00;"
      },
      "mock_data": {
        "students_rows": [
          {"id": 1, "name": "Alice Smith", "email": "alice.smith@uniinsight.edu", "dept": "CS Core", "cohort_year": 2024},
          {"id": 2, "name": "Bob Johnson", "email": "bob.johnson@uniinsight.edu", "dept": "Physics", "cohort_year": 2024},
          {"id": 3, "name": "Charlie Brown", "email": "charlie.brown@uniinsight.edu", "dept": "Math", "cohort_year": 2023},
          {"id": 4, "name": "Diana Prince", "email": "diana.prince@uniinsight.edu", "dept": "CS Core", "cohort_year": 2024}
        ],
        "placement_rows": [
          {"student_id": 1, "name": "Alice Smith", "tech_skills": 88, "coding": 92, "readiness": "89.5%"},
          {"student_id": 2, "name": "Bob Johnson", "tech_skills": 45, "coding": 38, "readiness": "42.0%"},
          {"student_id": 3, "name": "Charlie Brown", "tech_skills": 68, "coding": 60, "readiness": "64.2%"},
          {"student_id": 4, "name": "Diana Prince", "tech_skills": 95, "coding": 98, "readiness": "97.5%"}
        ],
        "fee_transactions_rows": [
          {"id": 101, "student_name": "Alice Smith", "due": 0.00, "status": "Paid", "date": "2026-04-10 10:22:15"},
          {"id": 102, "student_name": "Bob Johnson", "due": 1250.00, "status": "Pending", "date": "2026-05-01 14:10:45"},
          {"id": 103, "student_name": "Charlie Brown", "due": 0.00, "status": "Paid", "date": "2026-04-20 09:15:30"},
          {"id": 104, "student_name": "Diana Prince", "due": 0.00, "status": "Paid", "date": "2026-04-12 11:35:00"}
        ]
      }
    };
  }
};

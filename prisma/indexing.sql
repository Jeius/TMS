-- Filter by college or department:
SELECT * FROM thesis WHERE college_id = ? AND department_id = ?;

-- Search for theses by keyword (full-text search):
SELECT * FROM thesis WHERE title ILIKE '%search_keyword%';

-- Retrieve thesis versions:
SELECT * FROM ThesisFileVersion WHERE thesis_id = ? ORDER BY version DESC;

-- Filter theses by college and department with status:
SELECT * FROM Thesis WHERE college_id = ? AND department_id = ? AND status = 'FINAL_MANUSCRIPT';

-- Get unread notifications for a user:
SELECT * FROM Notification WHERE user_id = ? AND isRead = false;

-- Get thesis review feedback:
SELECT * FROM ThesisReview WHERE thesis_id = ? AND status != 'PENDING';

# Welcome to the Demo of DSABetter

## What is DSABetter?

DSABetter is a web application designed to help users master Data Structures and Algorithms (DSA) through intelligent practice, revision tracking, and analytics. It allows users to:

- Add, organize, and track DSA questions with notes, difficulty, site/platform, and revision status.
- Schedule and manage revisions using spaced repetition, helping users retain concepts over time.
- Visualize progress and analytics with charts and statistics on solved questions, revision streaks, and more.
- Search and filter questions by topic, difficulty, platform, or custom tags.
- Set reminders and use a revision calendar to plan and review upcoming tasks.
  The platform is focused on making DSA preparation more efficient and data-driven for coding interviews and learning.

## What was the reason behind DSABetter?

Solving just new problems does not makes a solid foundation. We can be better at DSA by our foundation. The best technique is to revise the questions that we were stuck early. Instead of avoiding our weak points we always much face them, struck against them and win over them. But how do we do it? How we store 100s of question? In the copy that we'll never reopen, huh? That's where DSA Better comes in! instead of following XYZ's DSASheet, make your own! Your own diary of weaknesses to conquer!. DSABetter is built around student's benefit to effectively revise and track their progress systematically and visually! It has a whole lot of feature to help you revise effectively! We're planning to ship more exciting features in the future! Best of luck!

## How to use DSABetter?

1. Log in/Sign up with your email address.

![Preview](https://i.ibb.co/mVFcRTmp/Screenshot-2025-06-27-143823.png)
![Preview](https://i.ibb.co/RpCGrWh5/Screenshot-2025-06-27-144155.png)

2. This will redirect you to the dashboard. This will look like :
   ![Preview](https://i.ibb.co/rG9BNQv9/Screenshot-2025-06-27-144327.png)

3. Now Click here
   ![Preview](https://i.ibb.co/GfghxGYG/Click-here.png)

4. Fill question details and press "Add Question"
   ![Preview](https://i.ibb.co/1G6mHRZ1/Your-paragraph-text.png)

5. Booom! The question has been added!
   ![Preview](https://i.ibb.co/hx7YXQKY/Screenshot-2025-06-27-150425.png)

6. You can head over to View All Question of search functionality
   ![Preview](https://i.ibb.co/qFFMtggD/Screenshot-2025-06-27-150559.png)

7. You can set reminders using the calendar
   ![Preview](https://i.ibb.co/3mssXYdW/Write-the-title.png)

8. The website offers various standards of analytics to help users review their prep.
   ![Preview](https://i.ibb.co/B5fFqy1p/Screenshot-2025-06-27-152018.png)

Wait Wait Wait ! There something for devs too...

# DSABetter Dev Instructions

Welcome to the DSABetter demo! Follow these steps to run and explore the project.

---

## 1. Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) running locally or a cloud instance

---

## 2. Setup

go to: https://github.com/KoustavBera/DSABetter

### Backend

1. Open a terminal and navigate to the `backend` directory:

   ```sh
   cd backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the `backend` folder with the following variables:

   ```
   MONGO_URI=mongodb://localhost:27017/dsabetter
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```sh
   npm start
   ```

   The backend should run on [http://localhost:5000](http://localhost:5000) by default.

---

### Frontend

1. Open a new terminal and navigate to the `frontend` directory:

   ```sh
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:

   ```sh
   npm run dev
   ```

   The frontend should run on [http://localhost:5173](http://localhost:5173) by default.

---

## 3. Demo Walkthrough

1. **Sign Up / Log In**

   - Open [http://localhost:5173](http://localhost:5173) in your browser.
   - Create a new account or log in with your credentials.

2. **Add a Question**

   - Click "Create new question" or navigate to `/create`.
   - Fill in the question details and submit.

3. **View & Manage Questions**

   - Go to "View All Questions" or `/view`.
   - Use search and filters to find questions.
   - Edit or delete questions using the action buttons.

4. **Revision & Analytics**

   - Visit the Dashboard to see your revision calendar, streak, and analytics.
   - Mark questions as revised and track your progress visually.

5. **Calendar Reminders**
   - Use the calendar to add reminders for revision or custom notes.

---

## 4. Notes

- Make sure MongoDB is running before starting the backend.
- If you change backend or frontend ports, update API URLs accordingly.
- For any issues, check the browser console and terminal output for errors.

---

Enjoy your demo of DSABetter!

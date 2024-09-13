Job Finder App
Overview
The Job Finder App is a React Native application designed for Android that allows users to browse job listings, bookmark their favorite jobs, and view detailed information about each job. The app uses infinite scrolling to fetch job data and provides offline storage for bookmarked jobs.

Features
Bottom Navigation: Two main sections - Jobs and Bookmarks.
Jobs Screen: Fetches job data from an API with infinite scroll functionality.
Job Cards: Displays job title, location, salary, and phone information.
Job Details Screen: Shows more details about a job when clicked.
Bookmarks: Allows users to bookmark jobs, which are stored for offline access.
State Management: Handles loading, error, and empty states effectively.
Technologies
React Native: Framework for building native apps using React.
React Navigation: For bottom tab navigation.
Axios: For API requests.
AsyncStorage: For local storage of bookmarked jobs.
React Native Paper: For UI components (optional, based on UI design preference).
Installation
Clone the Repository

bash
Copy code
git clone https://github.com/yourusername/job-finder-app.git
cd job-finder-app
Install Dependencies

bash
Copy code
npm install
Run the Application

bash
Copy code
npx react-native run-android
Ensure you have an Android emulator running or a physical device connected.

API
The app fetches job data from the following API:

Endpoint: https://testapi.getlokalapp.com/common/jobs?page=1
Features Implementation
1. Bottom Navigation
Utilizes React Navigation to switch between "Jobs" and "Bookmarks" tabs.

2. Jobs Screen
Infinite Scrolling: Implements infinite scrolling to fetch more jobs as the user scrolls.
Job Cards: Each card shows job title, location, salary, and phone.
Details Navigation: Clicking a job card navigates to a details screen.
3. Bookmarks
Bookmarking Jobs: Users can bookmark jobs which are saved using AsyncStorage for offline access.
Bookmarks Screen: Displays a list of bookmarked jobs.
4. Offline Storage
Uses AsyncStorage to store bookmarked jobs, ensuring they are available even when offline.

UI/UX
The UI is designed to be intuitive and user-friendly. You can customize the styling as per your preferences or use React Native Paper for pre-designed components.

State Management
Loading State: Shows a loading indicator while fetching data.
Error Handling: Displays error messages if the data fetch fails.
Empty State: Shows a message when no jobs are available or when the bookmarks list is empty.
Testing
Ensure to test on both Android emulator and physical devices.
Test different scenarios including empty states and error handling.
Video Reference



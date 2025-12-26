import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import StudentHome from './pages/StudentHome';
import TeacherHome from './pages/TeacherHome';
import Calendar from './pages/Calendar';
import Explore from './pages/Explore';
import Social from './pages/Social';
import Profile from './pages/Profile';
import TeacherProfile from './pages/TeacherProfile';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Favorites from './pages/Favorites';
import MyBookings from './pages/MyBookings';
import TeacherCourses from './pages/TeacherCourses';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Student Routes */}
          <Route element={<Layout role="student" />}>
            <Route path="/student" element={<StudentHome />} />
            <Route path="/student/calendar" element={<Calendar />} />
            <Route path="/student/explore" element={<Explore />} />
            <Route path="/student/social" element={<Social />} />
            <Route path="/student/profile" element={<Profile />} />
            <Route path="/student/favorites" element={<Favorites />} />
            <Route path="/student/bookings" element={<MyBookings />} />
            <Route path="/student/teacher/:id" element={<TeacherProfile />} />
          </Route>

          {/* Teacher Routes */}
          <Route element={<Layout role="teacher" />}>
            <Route path="/teacher" element={<TeacherHome />} />
            <Route path="/teacher/calendar" element={<Calendar />} />
            <Route path="/teacher/courses" element={<TeacherCourses />} />
            <Route path="/teacher/social" element={<Social />} />
            <Route path="/teacher/profile" element={<Profile />} />
          </Route>

        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;

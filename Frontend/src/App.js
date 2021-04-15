import Login from "./Pages/Login";
import ForgorPassword from "./Pages/ForgetPass";
import EnterOTP from "./Pages/OTP";
import Course from "./Pages/Course";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./Pages/Navbar"
import TeacherAssignments from "./Pages/TeacherAssignments";
import StudentAssignments from "./Pages/StudentAssignments";
import AssignmentStatus from "./Pages/AssignmentStatus";
import UploadAssignment from "./Pages/UploadAssignment";
import AddData from "./Pages/addData";
import AllStudents from "./Pages/AllStudents";
import AddStudents from "./Pages/AddStudents";
import ViewStudents from "./Pages/viewStudents";
import ViewTeachers from "./Pages/viewTeachers";


function App() {
  return (
      <div className="App">
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route exact path = "/course" component = {Course}></Route>
                <Route exact path = "/:courseid/StudentAssignments" component = {StudentAssignments}></Route>
                <Route exact path = "/:courseid/TeacherAssignments" component = {TeacherAssignments}></Route>
                <Route exact path = "/:courseid/addAssignment" component = {UploadAssignment}></Route>
                <Route exact path = "/addData" component = {AddData}></Route>
                <Route exact path = "/:assignid/AssignmentStatus" component = {AssignmentStatus}></Route>
                <Route exact path = "/course/:courseid" component = {AllStudents}></Route>
                <Route exact path = "/course/:courseid/AddStudents" component = {AddStudents}></Route>
                <Route exact path = "/viewTeachers" component = {ViewTeachers}></Route>
                <Route exact path = "/viewStudents" component = {ViewStudents}></Route>
            </Switch>
        </Router>
      </div>
  );
}

export default App;

import SideNav, {
    Toggle,
    NavItem,
    NavIcon,
    NavText,
  } from "@trendmicro/react-sidenav";
  
  import "@trendmicro/react-sidenav/dist/react-sidenav.css";
  
  const StudentSideNav = () => {
    return (
      <SideNav
        onSelect={(selected) => {
          window.location.replace("/" + selected);
        }}
        className="student_sidenav"
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="homepage">
          <NavItem eventKey="homepage">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: 20 }} />
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>
          <NavItem eventKey="studentslist">
            <NavIcon>
              <i class="fas fa-user-graduate"></i>
            </NavIcon>
            <NavText>Students List</NavText>
          </NavItem>
          <NavItem eventKey="studentcharts">
            <NavIcon>
              <i className="fa-solid fa-chart-simple" style={{ fontSize: 20 }} />
            </NavIcon>
            <NavText>Charts</NavText>
          </NavItem>
          <NavItem eventKey="studentnews">
            <NavIcon>
              <i className="fa-solid fa-envelope" style={{ fontSize: 20 }} />
            </NavIcon>
            <NavText>News</NavText>
          </NavItem>
          <NavItem eventKey="messages">
            <NavIcon>
              <i className="fa-solid fa-comments" style={{ fontSize: 20 }} />
            </NavIcon>
            <NavText>Messages</NavText>
          </NavItem>
          <NavItem eventKey="calculatorstudent">
            <NavIcon>
              <i class="fa-solid fa-calculator" style={{ fontSize: 20 }} />
            </NavIcon>
            <NavText>Calculator</NavText>
          </NavItem>
          <NavItem className="logout-student" eventKey="">
            <NavIcon>
              <i className="fas fa-sign-out-alt" style={{ fontSize: 20 }} />
            </NavIcon>
            <NavText>Logout</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  };
  
  export default StudentSideNav;
  
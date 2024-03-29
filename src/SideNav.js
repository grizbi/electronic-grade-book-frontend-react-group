import SideNav, {
    Toggle,
    NavItem,
    NavIcon,
    NavText,
  } from "@trendmicro/react-sidenav";
  
  import "@trendmicro/react-sidenav/dist/react-sidenav.css";
  
  const MySideNav = () => {
    return (
      <SideNav
        onSelect={(selected) => {
          window.location.replace("/" + selected);
        }}
        className="mysidenav"
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="homepage">
          <NavItem eventKey="homepage">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: 20 }} />
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>
          <NavItem eventKey="students">
            <NavIcon>
              <i class="fas fa-user-graduate"></i>
            </NavIcon>
            <NavText>Students</NavText>
          </NavItem>
          <NavItem eventKey="predictedgrades">
            <NavIcon>
              <i class="fas fa-medal" style={{ fontSize: 20 }} />
            </NavIcon>
            <NavText>Predicted grades</NavText>
          </NavItem>
          <NavItem eventKey="charts">
            <NavIcon>
              <i className="fa-solid fa-chart-simple" style={{ fontSize: 20 }} />
            </NavIcon>
            <NavText>Charts</NavText>
          </NavItem>
          <NavItem eventKey="news">
            <NavIcon>
              <i className="fa-solid fa-envelope" style={{ fontSize: 20 }} />
            </NavIcon>
            <NavText>News</NavText>
          </NavItem>
          <NavItem eventKey="calculator">
            <NavIcon>
              <i class="fa-solid fa-calculator" style={{ fontSize: 20 }} />
            </NavIcon>
            <NavText>Calculator</NavText>
          </NavItem>
          <NavItem className="logout" eventKey="">
            <NavIcon>
              <i className="fas fa-sign-out-alt" style={{ fontSize: 20 }} />
            </NavIcon>
            <NavText>Logout</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  };
  
  export default MySideNav;
  
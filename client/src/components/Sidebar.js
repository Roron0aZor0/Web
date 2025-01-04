const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Dashboard</h3>
      <ul>
        <li><Link to="/dashboard/overview">Overview</Link></li>
        <li><Link to="/dashboard/websites">Manage Websites</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><button className="btn btn-danger" onClick={() => { /* Add logout logic */ }}>Logout</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;

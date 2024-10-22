<button id="logout" onClick={()=>{
          localStorage.removeItem("team");
          navigate("/")
        }}>Logout</button>
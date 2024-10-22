import React from 'react'
import Layout from '../Layout/Layout'
import { useState } from 'react';
import './Login.css'

function Login() {
  const [teamId, setTeamId] = useState('');
  const [leaderName, setLeaderName] = useState('');

  const handleSubmit = (e)=>{
    e.preventDefault();
    localStorage.setItem('teamId', teamId)
    localStorage.setItem('teamLeader', leaderName)
  }
  return (
    <div>
      <Layout>
        <form onSubmit={handleSubmit} id='login-form'>
        {/* <h1>Login</h1> */}
          <div className='input-div'>
            <label htmlFor="teamId">Team ID:</label>
            <input
              type="text"
              id="teamId"
              className='login-input'
              placeholder='Enter the team code'
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              required
            />
          </div>
          <div className='input-div'>
            <label htmlFor="leaderName">Leader Name:</label>
            <input
              type="text"
              id="leaderName"
              className='login-input'
              placeholder='Enter the name of team leader'
              value={leaderName}
              onChange={(e) => setLeaderName(e.target.value)}
              required
            />
          </div>
          <button id='login-btn' type="submit">Login</button>
        </form>
      </Layout>
    </div>
  )
}

export default Login

import React, { useState, useLayoutEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

import httpRequest from '../../utils/httpRequest'
import { LogoIcon } from '../../components/Icons'
import GoogleIcon from '../../assets/img/google.png'
import LoginHero from '../../assets/img/login-hero.jpg'
import Button from '../../components/Button'
import { useAuth } from '../../store/UserContext'
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
const cl = classNames.bind(styles);

function Login() {
  const navigate = useNavigate()
  const [account, setAccount] = useAuth()
  console.log(account)
  useLayoutEffect(() => {
    if (Object.keys(account).length !== 0) {
      navigate('/')
      return
    }
  }, [])

  const [user, setUser] = useState({ username: '', password: '' })
  const handleChangeInput = ({ name, value }) => {
    setUser(prev => (
      {
        ...prev,
        [name]: value
      }
    ))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await httpRequest.post('/auth/login', user)
    if (res.data.msg)
      console.log(res.data.msg)
    else {
      setAccount(res.data.details)
      localStorage.setItem('user', JSON.stringify(res.data.details))
      navigate('/')
    }
  }

  const handleLoginGoogle = async () => {
    // const res = await axios.get('http://localhost:3006/api/auth/google')
    // console.log(res)
    window.open('http://localhost:3006/api/auth/google', '_self')
  }

  return (
    <div className={cl('login')}>
      <div className={cl('left')}>
        <LogoIcon className={cl('logo')} />
        <h3 className={cl('title')}>Welcome back</h3>
        <form className={cl('form')} onSubmit={handleSubmit}>
          <input className={cl('input')} type="text" id="username" placeholder="Enter your username" name="username" value={user.username} onChange={(e) => handleChangeInput(e.target)} />
          <input className={cl('input')} type="password" id="password" name="password" placeholder="Enter your password" value={user.password} onChange={(e) => handleChangeInput(e.target)} />
          <Button filled className={cl('submit')}>Continue</Button>
        </form>
        <div className={cl('separator')}>
          <span className={cl('line')}></span>
          <span className={cl('line-text')}>OR</span>
        </div>
        <div className={cl('socials')}>
          <Button onClick={handleLoginGoogle}><img className={cl('icon')} src={GoogleIcon} alt="google" />Login with Google</Button>
          <Button onClick={handleLoginGoogle} leftIcon={faFacebook}>Login with Facebook</Button>
        </div>
        <div className={cl('bottom')}>
          Don't have an account? <Link to='/register' className={cl('signup')}>Sign up</Link>
        </div>


      </div>
      <div className={cl('right')}>
        <img src={LoginHero} alt="" className={cl('hero')} />
      </div>

    </div>
  )
}

export default Login
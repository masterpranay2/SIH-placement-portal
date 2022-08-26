import Button from '../Button'
import styles from './style.module.scss'
import { Link } from 'react-router-dom'
 
import heroImage from '../../assets/hero.png'
import { useDispatch } from 'react-redux';
import { addBreadCrumb, clearBreadCrumb } from "../../redux/reducers/breadCrumbReducer";


const Hero = () => {
  const dispatch = useDispatch()

  // add the register breadcrumb
  const addRegisterBreadCrumb = () => {
    dispatch(clearBreadCrumb())
    dispatch(addBreadCrumb({
      name: 'Home',
      url: '/'
    }))
    dispatch(addBreadCrumb({
      name: 'Register',
      url: '/auth/register'
    }))
  }

  return (
    <div className={styles.hero}>

      {/* Left part of hero section */}
      <section className={styles.hero_left}>
        <Button text="Smart India Hackathon" special/>
        <h1>
          Welcome to <span className='highlight'>Placement Portal</span>
        </h1>
        <p>
        Integrated Portal for Campus Placement in India. Help government in making placements in India much more helpful for students.
        </p>
        <Button text={<Link to='/auth/register'>Get Started</Link>} size="large" animate onclick={addRegisterBreadCrumb}/>
      </section>

      {/* Right part of hero section */}
      <section className={styles.hero_right}>
        <img src={heroImage} alt="hero"/>
      </section>

      {/* blob */}
      <div className={styles.blob}>
      </div>

    </div>
  )
}

export default Hero;
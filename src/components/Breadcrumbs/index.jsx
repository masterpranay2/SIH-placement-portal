import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeBreadCrumb } from "../../redux/reducers/breadCrumbReducer";

import styles from './style.module.scss';

const BreadCrumbs = ({invert}) => {
  const breadcrumbs = useSelector(state => state.breadCrumb.breadCrumbList)
  const dispatch = useDispatch()

  // clear crumbs greater than the clicked one
  const clearCrumbs = index => {
    for(let i = index+1; i < breadcrumbs.length; i++) {
      dispatch(removeBreadCrumb())
    }
  }

  return (
    <div className={`${styles.breadCrumbs} ${invert ? styles.invert : ''}`}>
      <ul>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <li key={index} onClick={() => clearCrumbs(index)}>
              <Link className="underline" to={breadcrumb.url}>{breadcrumb.name}</Link>
              {
                index !== breadcrumbs.length - 1 &&
                <span> {`/`} </span>
              }
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default BreadCrumbs;
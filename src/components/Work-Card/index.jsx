import institutionsLogo from '../../assets/institutions.png';
import corporateLogo from '../../assets/corporates.png';
import govtLogo from '../../assets/govt.png';

import styles from './style.module.scss';

const cardData = [
  {
    logoSrc: institutionsLogo,
    headingHighlighted: 'Academic Institutions',
    heading: 'upload placement data',
    bodyText:
      'This data can be uploaded using Excel Sheets. Institution can update their student data through the dashboard.',
  },
  {
    logoSrc: corporateLogo,
    headingHighlighted: 'Corporates',
    heading: 'analyze the placement data of students',
    bodyText:
      'This is done using a minimal Dashboard with variety of filters, graphs and proper representation of data.',
  },
  {
    logoSrc: govtLogo,
    headingHighlighted: 'Government',
    heading: 'Policy makers take advantage of this data',
    bodyText:
      'Data can be used to determine the unemployment or the ratio of students opting for Higher Education.',
  },
];

const WorkCardView = () => {
  return (
    <div className={styles.work}>
      <header>
        <h1>How It works ?</h1>
      </header>
      <div className={styles.workcardlist}>
        {cardData.map((card, index) => (
          <WorkCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

const WorkCard = ({ logoSrc, headingHighlighted, heading, bodyText }) => {
  return (
    <div className={styles.workcard}>
      <div className="logo">
        <img src={logoSrc} alt="logo" />
      </div>
      <div className={styles.heading}>
        <span className={styles.heading_highlighted}>{headingHighlighted}</span>
        &nbsp;
        <span className="normal">{heading}</span>
      </div>
      <div className={styles.bodytext}>
        <p>{bodyText}</p>
      </div>
    </div>
  );
};

export default WorkCardView;

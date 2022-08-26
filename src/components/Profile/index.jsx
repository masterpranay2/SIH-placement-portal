import Input from '../Input';
import Button from '../Button';

import styles from './style.module.scss';
import profielIamgeUrl from '../../assets/profile-image.png';
import TimelineModel from '../Timeline-Model';
import { useState } from 'react';

const FormContainer = () => {
  return (
    <div className={styles.formContainer}>
      <form>
        <Input label="Full Name" placeholder="Enter your name" type="text" />

        <Input label="Email" placeholder="Enter your email" type="text" />

        <Input
          label="Aadhar Number"
          placeholder="Enter your aadhar number"
          type="number"
        />

        <Input
          label="Skills"
          placeholder="Enter your skills( separated by comma )"
          type="text"
        />

        <Input
          label="Job Position"
          placeholder="Enter your job position"
          type="text"
        />

        <Input
          label="Job Sector"
          placeholder="Enter your job sector"
          type="text"
        />

        <Input
          label="Company Name"
          placeholder="Enter your company name"
          type="text"
        />

        <Input
          label="Resume"
          placeholder="Upload your resume"
          err="Only Pdf files are allowed"
          type="upload"
        />

        <Input
          label="Portfolio"
          placeholder="Add your portfolio ( website )"
          type="text"
        />
      </form>

      <Button text="Update" normal size="large" unInvertOnHover />
    </div>
  );
};

const ProfileImageContainer = () => {
  return (
    <div className={styles.profileImageContainer}>
      <img src={profielIamgeUrl} alt="profile" />
      <div className={styles.imageButtons}>
        <Button text="Change" normal animate />
        <Button text="Remove" normal outline animate />
      </div>
    </div>
  );
};

const Timeline = ({ name, what, time, desig, bio }) => {
  return (
    <div className={styles.timelineContainer}>
      <h3>{name}</h3>
      <p>
        {what} . {time}
      </p>
      <p>{desig}</p>
      <p>{bio}</p>
    </div>
  );
};

const ExperienceContainer = () => {
  const [dialogState, setDialogState] = useState(false);
  return (
    <div className={styles.experienceContainer}>
      <h2>Experience</h2>
      <div className={styles.experienceWrapper}>
        <Timeline
          name="AICTE"
          what="Internship"
          time="Feb 2021 - July 2021"
          desig="India"
          bio="Handled web development operations and increased web visits."
        />
        <Timeline
          name="AICTE"
          what="Internship"
          time="Feb 2021 - July 2021"
          desig="India"
          bio="Handled web development operations and increased web visits."
        />
      </div>
      <Button
        text="Add More"
        normal
        outline
        invertOnHover
        onclick={() => setDialogState(true)}
      />
      <TimelineModel isOpen={dialogState} onClose={setDialogState} />
    </div>
  );
};

const EducationContainer = () => {
  const [dialogState, setDialogState] = useState(false);
  return (
    <div className={styles.educationContainer}>
      <h2>Education</h2>
      <div className={styles.educationWrapper}>
        <Timeline
          name="Chandigarh University"
          what="Btech"
          desig="Gharuan Mohali Punjab"
          time="Oct 2021 - July 2025"
          bio="Handled web development operations and increased web visits."
        />
        <Timeline
          name="Chandigarh University"
          what="Btech"
          time="Oct 2021 - July 2025"
          desig="Gharuan Mohali Punjab"
          bio="Handled web development operations and increased web visits."
        />
      </div>
      <Button
        text="Add More"
        normal
        outline
        invertOnHover
        onclick={() => setDialogState(true)}
      />
      <TimelineModel isOpen={dialogState} onClose={setDialogState} />
    </div>
  );
};

const InstitutionFormContainer = () => {
  return (
    <div className={styles.institutionFormContainer}>
      <form>
        <Input
          label="Institution Name"
          placeholder="Enter your institution name"
          type="text"
        />
        <Input label="Email" placeholder="Enter your email" type="text" />
        <Input
          label="Institution Id"
          placeholder="Enter your institution id"
          type="number"
        />
        <Input label="Website" placeholder="Add your website" type="text" />
        <Input label="Address" placeholder="Enter your address" type="text" />
        <Button text="Update Profile" normal size="large" unInvertOnHover/>
      </form>
    </div>
  );
};

const CorporatesFormContainer = () => {
  return (
    <div className={styles.institutionFormContainer}>
      <form>
        <Input
          label="Company Name"
          placeholder="Enter your company name"
          type="text"
        />
        <Input label="Email" placeholder="Enter your email" type="text" />
        <Input label="Website" placeholder="Add your website" type="text" />
        <Input label="Address" placeholder="Enter your address" type="text" />
        <Button text="Update Profile" normal size="large" unInvertOnHover/>
      </form>
    </div>
  )
}

export const InstitutionProfile = () => {
  return (
    <div className={styles.institutionProfile}>
      <h1>Institution Profile</h1>
      <InstitutionFormContainer />
    </div>
  );
};

export const CorporatesProfile = () => {
  return (
    <div className={styles.institutionProfile}>
      <h1>Corporates Profile</h1>
      <CorporatesFormContainer />
    </div>
  );
}

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <h1>Student Profile</h1>
      <div className={styles.profileFormContainer}>
        <FormContainer />
        <ProfileImageContainer />
        <ExperienceContainer />
        <EducationContainer />
      </div>
    </div>
  );
};

export default Profile;

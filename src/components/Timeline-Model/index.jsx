import styles from './style.module.scss';
import cross from '../../assets/cross.png';
import Input from '../Input';
import { useEffect, useRef } from 'react';
import Button from '../Button';
const TimelineModel = ({ isOpen, onClose }) => {
  const dialog = useRef(null);
  useEffect(() => {
    if (isOpen) {
      dialog.current.removeAttribute('open')
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isOpen])
  dialog.current?.addEventListener('click', e => {
    const rect = dialog.current.getBoundingClientRect();
    const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
      && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      onClose(false);
    }
  });
  return (<dialog ref={dialog} >
    <div className={styles.timelineModel} >
      <div className={styles.timelineTop}>
        <h2>Add New Job Position</h2>
        <Button
          text={<img src={cross} alt="cross" />}
          outline
          onclick={() => onClose(false)}
        />
      </div>
      <form>
        <Input
          label="Job Sector"
          type="dropdown"
          placeholder={"Pick your job sector"}
          options={['Option 1', 'Option 2', 'Option 3']}
          onOptionClick={(opt) => console.log(opt)} // TODO : update the onOptionClick function
        />
        <Input
          label="Job Position"
          type="text"
          placeholder={"Enter your current job position"}
        />
        <div className={styles.datesWrapper}>
          <Input
            label="Starting Year"
            placeholder="Pick Date"
            // err = "Date is required"
            type="date"
            size="small"
          />

          <Input
            label="Ending Year"
            placeholder="Pick Date"
            // err = "Date is required"
            type="date"
            size="small"
          />
        </div>
        <Input
          label="Contribution"
          type="text"
          placeholder={"Write a few lines about your contribution..."}
        />
        <Button
          text="Add"
          normal
        />
      </form>
    </div>

  </dialog>
  )
};

export default TimelineModel;

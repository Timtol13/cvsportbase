import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import styles from './MainModal.module.scss';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const months = ['3 Мес', '6 Мес', '12 Мес']

export const MainModal = () => {
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent className={styles.container}>
                    <div className={styles.title}>Добавь видео с YouTube!</div>
                    <div><input type="text"/><button>ок</button></div>
                    <div className={styles.subtitle}>
                        <div>Хотите добавить больше видео?</div>
                        <div>Купите подписку!</div>
                    </div>
                    <div className={styles.months1}>
                        {months.map(month => {
                            return <div className={styles.month1}>{month}</div>
                        })}
                    </div>
                    <div>10 видео с YouTube + 10 видео до 150мб</div>
                    <div className={styles.months2}>
                        {months.map(month => {
                            return <div className={styles.month2}>{month}</div>
                        })}
                    </div>
                    <button>Купить подписку</button>
                </DialogContent>
            </Dialog>
    );
}

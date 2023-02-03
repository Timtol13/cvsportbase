import React from 'react'
import styles from './Forms.module.scss'

export const Player = () => {
    return (
        <form>
            <div className={styles.inputs}>
                <input id={'first_name'} placeholder={'Имя'}/>
                <input id={'second_name'} placeholder={'Фамилия'}/>
                <input id={'patronymic'} placeholder={'Отчество'}/>
                <input id={'age'} placeholder={'Возраст'}/>
                <input id={'height'} placeholder={'Рост'} />
                <input id={'weight'} placeholder={'Вес'} />
                <input id={'phone'} type={'phone'} placeholder={'Номер телефона'} />
                <input id={'email'} type={'email'} placeholder={'E-mail'} />
                <input id={'country'} placeholder={'Страна'} />
                <input id={'city'} placeholder={'Город'} />
                <input id={'shengen'} className={styles.checkbox} type={'checkbox'} /><i>Шенген</i>
            </div>
        </form>
    )
}
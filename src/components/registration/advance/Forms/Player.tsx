import React from 'react'
import styles from './Forms.module.scss'

export const Player = () => {
    return (
        <form>
            <label className="input-file">
                <input type="file" />
                    <span>Выберите файл</span>
            </label>
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
                <textarea id={'description'} placeholder={'Напишите о себе'} />
                <input id={'is_active'} className={styles.checkbox} type={'checkbox'} checked /><i>Отображать всем</i>
                <input id={'shengen'} className={styles.checkbox} type={'checkbox'} /><i>Шенген</i>
            </div>

        </form>
    )
}
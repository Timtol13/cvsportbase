import React, {useState} from 'react';
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import {MyVideo} from "./MyVideo/MyVideo";
import styles from "./Home.module.scss";
import {Profiles} from "./Profiles/Profiles";

export type ActionType = {
    [key: string]: boolean
}

export const Home = () => {
    const [active, setActive] = useState('')
    const setAction = ({isActive}: ActionType) => (isActive ? styles.active : styles.link)
    const isActiveSubButton = (isActive: string) => (isActive === active ? styles.subActive : styles.subLink)
    return (
        <div className={styles.home}>
            <div className={styles.links}>
                <div className={styles.linkContainer}>
                    <NavLink to={'myVideo'} className={setAction}
                             onClick={() => setActive('myVideo')}>
                        <button>
                            Мои видео
                        </button>
                    </NavLink>
                </div>
                <div className={styles.linkContainer}>
                    <NavLink to={'head'} className={setAction} onClick={() => setActive('head=all')}>
                        <button>
                            Нога
                        </button>
                    </NavLink>
                    {active === 'head=left' || active === 'head=right' || active === 'head=all'
                        ? <div className={styles.subButtons}>
                            <button className={isActiveSubButton('head=left')}
                                    onClick={() => setActive('head=left')}>Левая
                            </button>
                            <button className={isActiveSubButton('head=right')}
                                    onClick={() => setActive('head=right')}>Правая
                            </button>
                        </div>
                        : null
                    }
                </div>
                <div className={styles.linkContainer}>
                    <NavLink to={'position'} className={setAction} onClick={() => setActive('position=all')}>
                        <button>
                            Позиция
                        </button>
                    </NavLink>
                    {active === 'position=all' || active === 'position=goalkeeper' || active === 'position=defender' || active === 'position=midfielder' || active === 'position=striker'
                        ? <div className={styles.subButtons}>
                            <button className={isActiveSubButton('position=goalkeeper')}
                                    onClick={() => setActive('position=goalkeeper')}>Вратарь
                            </button>
                            <button className={isActiveSubButton('position=defender')}
                                    onClick={() => setActive('position=defender')}>Защитник
                            </button>
                            <button className={isActiveSubButton('position=midfielder')}
                                    onClick={() => setActive('position=midfielder')}>Полузащитник
                            </button>
                            <button className={isActiveSubButton('position=striker')}
                                    onClick={() => setActive('position=striker')}>Нападающий
                            </button>
                        </div>
                        : null
                    }
                </div>
                <div className={styles.linkContainer}>
                    <NavLink to={'age'} className={setAction} onClick={() => setActive('age')}>
                        <button>
                            Возраст
                        </button>
                    </NavLink>
                    {active === 'age'
                        ? <div className={styles.subButtons}>
                            <input className={isActiveSubButton('age1')} placeholder={'От'}/>
                            <input className={isActiveSubButton('age1')} placeholder={'До'}/>
                        </div>
                        : null
                    }
                </div>
                <div className={styles.linkContainer}>
                    <NavLink to={'weight'} className={setAction} onClick={() => setActive('weight')}>
                        <button>
                            Вес
                        </button>
                    </NavLink>
                    {active === 'weight'
                        ? <div className={styles.subButtons}>
                            <input className={isActiveSubButton('weight1')} placeholder={'От'}/>
                            <input className={isActiveSubButton('weight1')} placeholder={'До'}/>
                        </div>
                        : null
                    }
                </div>
                <div className={styles.linkContainer}>
                    <NavLink to={'height'} className={setAction} onClick={() => setActive('height')}>
                        <button>
                            Рост
                        </button>
                    </NavLink>
                    {active === 'height'
                        ? <div className={styles.subButtons}>
                            <input className={isActiveSubButton('height1')} placeholder={'От'}/>
                            <input className={isActiveSubButton('height1')} placeholder={'До'}/>
                        </div>
                        : null
                    }
                </div>
                <div className={styles.linkContainer}>
                    <NavLink to={'schengen'} className={setAction} onClick={() => setActive('schengen=all')}>
                        <button>
                            Шенген
                        </button>
                    </NavLink>
                    {active === 'schengen=all' || active === 'schengen=yes' || active === 'schengen=no'
                        ? <div className={styles.subButtons}>
                            <button className={isActiveSubButton('schengen=yes')}
                                    onClick={() => setActive('schengen=yes')}>Да
                            </button>
                            <button className={isActiveSubButton('schengen=no')}
                                    onClick={() => setActive('schengen=no')}>Нет
                            </button>
                        </div>
                        : null
                    }
                </div>
            </div>
            <Routes>
                <Route path='/' element={<Navigate to={'myVideo'}/>}/>
                <Route path='myVideo' element={<MyVideo/>}/>
                <Route path='head' element={<Profiles/>}/>
                <Route path='position' element={<Profiles/>}/>
                <Route path='age' element={<Profiles/>}/>
                <Route path='weight' element={<Profiles/>}/>
                <Route path='height' element={<Profiles/>}/>
                <Route path='schengen' element={<Profiles/>}/>
            </Routes>
        </div>
    );
};

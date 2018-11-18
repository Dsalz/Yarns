import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/NotificationComponents/NotificationItem.css';


const NotificationItem = ({ type, message ,isRead, creatorUsername, timeCreated }) =>{
    const timespan = Math.abs(new Date().getTime() - new Date(timeCreated).getTime());
    const timespanLength = Math.round( timespan/(1000 * 60 * 60) );
    return(
        <section className = { isRead ? 'notification-item isRead' : "notification-item isNotRead"}>
                <div className = "notification-item-core">
                    <div className = "notification-item-img">
                        {type === "new_comment_in_room" && <svg viewBox="-6 0 512 512"><linearGradient id="a" gradientTransform="matrix(.654102 0 0 -.654102 -5.648726 510.973452)" gradientUnits="userSpaceOnUse" x1="391.3761" x2="391.3761" y1="1.2442" y2="869.7823"><stop offset="0" stopColor="#e93e3a"/><stop offset=".352" stopColor="#ed683c"/><stop offset=".701" stopColor="#f3903f"/><stop offset="1" stopColor="#fdc70c"/></linearGradient><g fill="url(#a)"><path d="m142.71875 275.210938v86.105468c0 17.832032 14.457031 32.289063 32.289062 32.289063v32.289062c0 4.636719 2.964844 8.75 7.363282 10.214844 1.097656.363281 2.246094.546875 3.402344.550781 3.386718 0 6.578124-1.597656 8.609374-4.308594l29.0625-38.746093h102.25c17.832032 0 32.289063-14.457031 32.289063-32.289063v-86.105468c0-17.832032-14.457031-32.289063-32.289063-32.289063h-150.6875c-17.832031 0-32.289062 14.453125-32.289062 32.289063zm193.738281 0v86.105468c0 5.945313-4.820312 10.761719-10.761719 10.761719h-107.632812c-3.386719 0-6.578125 1.597656-8.613281 4.304687l-12.914063 17.222657v-10.761719c0-5.945312-4.820312-10.765625-10.761718-10.765625h-10.765626c-5.945312 0-10.761718-4.816406-10.761718-10.761719v-86.105468c0-5.945313 4.816406-10.765626 10.761718-10.765626h150.6875c5.941407 0 10.761719 4.820313 10.761719 10.765626zm0 0"/><path d="m185.773438 285.972656h129.15625v21.527344h-129.15625zm0 0"/><path d="m185.773438 329.027344h129.15625v21.523437h-129.15625zm0 0"/><path d="m496.710938 196.347656-63.386719-51.308594v-85.09375c0-5.941406-4.816407-10.761718-10.761719-10.761718h-64.578125c-5.945313 0-10.765625 4.820312-10.765625 10.761718v15.390626l-90.097656-72.941407c-3.949219-3.191406-9.589844-3.191406-13.539063 0l-239.589843 193.953125c-4.621094 3.742188-5.335938 10.515625-1.59375 15.136719.003906.007813.007812.011719.011718.019531l27.125 33.363282c3.742188 4.605468 10.507813 5.308593 15.121094 1.574218l22.71875-18.394531v262.425781h-32.289062v21.527344h430.527343v-21.527344h-32.289062v-262.425781l22.722656 18.394531c4.609375 3.734375 11.375 3.03125 15.121094-1.574218l27.121093-33.363282c3.75-4.613281 3.050782-11.394531-1.5625-15.140625-.003906-.003906-.011718-.011719-.015624-.015625zm-127.964844-125.636718h43.054687v56.894531l-43.054687-34.839844zm43.050781 419.761718h-322.894531v-279.84375l161.449218-130.707031 161.445313 130.707031zm49.449219-267.519531-204.125-165.246094c-3.949219-3.195312-9.589844-3.195312-13.539063 0l-204.125 165.246094-13.539062-16.628906 224.433593-181.714844 224.433594 181.714844zm0 0"/></g></svg>}
                        {type === "accolade_given" && (<svg id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" ><g><g>
                                <g>
                                    <path d="M486.4,25.6h-76.8V0H102.4v25.6H25.6C10.24,25.6,0,35.84,0,51.2v61.44c0,58.88,43.52,107.52,102.4,115.2v2.56    c0,74.24,51.2,135.68,120.32,151.04L204.8,435.2h-58.88c-10.24,0-20.48,7.68-23.04,17.92L102.4,512h307.2l-20.48-58.88    c-2.56-10.24-12.8-17.92-23.04-17.92H307.2l-17.92-53.76c69.12-15.36,120.32-76.8,120.32-151.04v-2.56    c58.88-7.68,102.4-56.32,102.4-115.2V51.2C512,35.84,501.76,25.6,486.4,25.6z M102.4,176.64c-28.16-7.68-51.2-33.28-51.2-64V76.8    h51.2V176.64z M307.2,256L256,227.84L204.8,256l12.8-51.2l-38.4-51.2h53.76L256,102.4l23.04,51.2h53.76l-38.4,51.2L307.2,256z     M460.8,112.64c0,30.72-23.04,58.88-51.2,64V76.8h51.2V112.64z"/>
                                </g>
                        </g></g> </svg>)}
                        {type === "new_reply" && (<svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" ><g><g>
                                <g>
                                    <path d="M511.563,434.259c-1.728-142.329-124.42-258.242-277.087-263.419V95.999c0-17.645-14.342-31.999-31.974-31.999    c-7.931,0-15.591,3.042-21.524,8.562c0,0-134.828,124.829-173.609,163.755C2.623,241.109,0,248.088,0,255.994    c0,7.906,2.623,14.885,7.369,19.687c38.781,38.915,173.609,163.745,173.609,163.745c5.933,5.521,13.593,8.562,21.524,8.562    c17.631,0,31.974-14.354,31.974-31.999v-74.591c153.479,2.156,255.792,50.603,255.792,95.924c0,5.896,4.767,10.666,10.658,10.666    c0.167,0.021,0.333,0.01,0.416,0c5.891,0,10.658-4.771,10.658-10.666C512,436.259,511.854,435.228,511.563,434.259z"/>
                                </g>
                            </g></g> </svg>)}
                        {type === "new_follow" && (<svg id="Layer_1" x="0px" y="0px" viewBox="0 0 258.75 258.75" ><g><g>
                                <circle cx="129.375" cy="60" r="60" data-original="#000000" fill="#ff7f00"/>
                                <path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z" fill="#ff7f00"/>
                            </g></g> </svg>)}
                    </div>

                    <div className = "notification-item-msg">
                        <p> <Link className="notification-creator-link" to = {`/user/${creatorUsername}`}> {creatorUsername} </Link> {message}</p>
                        <span className="notification-time">{ (timespanLength < 1) ? "Just now" : (timespanLength === 1)? `1 hour ago`  : (timespanLength < 24)? `${timespanLength} hours ago` :(Math.round(timespanLength/24) === 1) ? "1 day ago" : `${Math.round(timespanLength/24)} days ago` }</span>
                    </div>
                
                </div>
            <hr className = 'notification-item-secondline' />
        </section>
    )
}

export default NotificationItem;
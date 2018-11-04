import React from 'react';

const Modal = ({title, info, close }) =>{
    return(
        <section className="yarns-modal-container">

            <div onClick={close} className="yarns-modal-backdrop">

            </div>

            <div className="yarns-actualmodal">

                <header className="yarns-actualmodal-header">
                    <h2>{title}</h2>
                    <button onClick={close}>x</button>
                </header>

                <main className="yarns-actualmodal-body">
                    <p>{info}</p>
                </main>

            </div>

        </section>
    )
}

export default Modal;
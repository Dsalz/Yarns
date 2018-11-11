import React from 'react';

const Modal = ({title, info, close, options, optionAText, optionAFunc, optionBText, optionBFunc }) =>{
    return(
        <section className="yarns-modal-container">

            <div onClick={close} className="yarns-modal-backdrop">

            </div>

            <div className="yarns-actualmodal">

                <header className="yarns-actualmodal-header">
                    <h2>{title}</h2>
                    <button onClick={close}>&times;</button>
                </header>

                <main className="yarns-actualmodal-body">
                    <p>{info}</p>
                </main>

                { options && <footer className="yarns-actualmodal-footer">
                    <button className="yarns-actual-modal-less-serious-btn" onClick={optionAFunc}>
                        {optionAText}
                    </button>
                    <button className="yarns-actual-modal-more-serious-btn" onClick={optionBFunc}>
                        {optionBText}
                    </button>
                </footer>}

            </div>

        </section>
    )
}

export default Modal;